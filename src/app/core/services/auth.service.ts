import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../dto/auth-response';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  private platformId = inject(PLATFORM_ID);
  authToken = signal<string | null>(null);
  authReady = signal(false);

  constructor(private http: HttpClient) {
    super();
    const token = localStorage.getItem('token') ?? '';
    this.authToken.set(token);
    this.authReady.set(true);

    effect(() => {
      const token = this.authToken();
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/login`, { username: username, password: password }, { withCredentials: true })
      .pipe(tap(res => {
        this.authToken.set(res.token);
      }));
  }

  logout() {
    this.clearToken();
  }

  register(username: string, firstname: string, lastname: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/register`, { username: username, firstName: firstname, lastName: lastname, password: password }, { withCredentials: true })
      .pipe(tap(res => {
        this.authToken.set(res.token);
      }));
  }

  refresh(): Observable<string> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/auth/refresh`, { }, { withCredentials: true })
      .pipe(map(res => res.token));
  }

  isLoggedIn(): boolean {
    const token = this.authToken();
    if (!token) return false;

    try {
      const payload = this.parseToken(token);
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  clearToken() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.authToken.set(null);
  }

  parseToken(token: string) {
    if (!token) return '';
    return JSON.parse(atob(token.split('.')[1]));
  }
}
