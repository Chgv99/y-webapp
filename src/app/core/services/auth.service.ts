import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../dto/auth-response';
import { ApiService } from './api.service';

export const authToken = signal<string | null>(null);
export const authReady = signal(false);

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {

  constructor(private http: HttpClient) {
    super();
    if (typeof localStorage !== 'undefined') {
      authToken.set(localStorage.getItem('token'));
    }
    authReady.set(true);
  }

  login(username: string, password: string)/*: Observable<LoginResponse>*/ {
    var res: Observable<AuthResponse> = this.http.post<AuthResponse>(`${this.API}/auth/login`, { username: username, password: password });
    res.subscribe({
      next: res => {
        this.setToken(res.token);
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
        this.setToken(res.token);
      }
    });
    return res;
  }

  isLoggedIn(): boolean {
    if (typeof localStorage === 'undefined') return false
    const token = authToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  setToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    }
    authToken.set(token);
  }

  clearToken() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    authToken.set(null);
  }
}
