import { Routes } from '@angular/router';
import { LoginForm } from './login-form/login-form';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginForm },
  { path: 'home', component: Home },
];
