import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshInProgress = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Always start from a request that sends cookies
    let authReq = req.clone({ withCredentials: true });

    // Explicitly bypass ONLY auth endpoints (but still send cookies)
    if (
      req.url.endsWith('/auth/login') ||
      req.url.endsWith('/auth/refresh')
    ) {
      return next.handle(authReq);
    }

    // Attach access token if present
    const token = localStorage.getItem('token');
    if (token) {
      authReq = authReq.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status !== 401) {
          return throwError(() => err);
        }

        if (!this.refreshInProgress) {
          this.refreshInProgress = true;
          this.refreshSubject.next(null);

          return this.authService.refresh().pipe(
            switchMap(newToken => {
              this.refreshInProgress = false;

              localStorage.setItem('token', newToken);
              this.refreshSubject.next(newToken);

              // Retry original request with NEW token
              return next.handle(
                authReq.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                })
              );
            }),
            catchError(refreshErr => {
              this.refreshInProgress = false;
              this.authService.logout();
              return throwError(() => refreshErr);
            })
          );
        }

        // Other requests wait for refresh to complete
        return this.refreshSubject.pipe(
          filter(t => t !== null),
          take(1),
          switchMap(t =>
            next.handle(
              authReq.clone({
                setHeaders: {
                  Authorization: `Bearer ${t}`
                }
              })
            )
          )
        );
      })
    );
  }
}

