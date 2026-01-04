import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
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

  login(username: string, password: string)/*: Observable<LoginResponse>*/ {
    var res: Observable<AuthResponse> = this.http.post<AuthResponse>(`${this.API}/auth/login`, { username: username, password: password });
    res.subscribe({
      next: res => {
        this.authToken.set(res.token);
      }
    });
    return res;
  }

  logout() {
    this.clearToken();
  }

  register(username: string, password: string)/*: Observable<LoginResponse>*/ {
    var res: Observable<AuthResponse> = this.http.post<AuthResponse>(`${this.API}/auth/register`, { username: username, password: password });
    res.subscribe({
      next: res => {
        this.authToken.set(res.token);
      }
    });
    return res;
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
    this.authToken.set('');
  }

  parseToken(token: string) {
    if (!token) return '';
    return JSON.parse(atob(token.split('.')[1]));
  }
}
