import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';

export const authToken = signal<string | null>(null);

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() {
    if (typeof localStorage !== 'undefined') {
      authToken.set(localStorage.getItem('token'));
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
