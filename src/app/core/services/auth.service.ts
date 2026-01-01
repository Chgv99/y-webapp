import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { AuthResponse } from '../dto/auth-response';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export const authToken = signal<string | null>(null);

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
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
