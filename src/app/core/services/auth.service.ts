import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { AuthResponse } from '../dto/auth-response';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export const authToken = signal<string | null>(null);

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {

  constructor(private http: HttpClient) {
    super();
    if (typeof localStorage !== 'undefined') {
      authToken.set(localStorage.getItem('token'));
    }
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
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
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
