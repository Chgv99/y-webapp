import { Routes } from '@angular/router';
import { LoginForm } from './login-form/login-form';
import { Home } from './home/home';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { RegisterForm } from './register-form/register-form';

export const routes: Routes = [
  { 
    path: 'register', 
    canActivate: [GuestGuard],
    component: RegisterForm
  },
  { 
    path: 'login', 
    canActivate: [GuestGuard],
    component: LoginForm
  },
  { 
    path: 'home', 
    canActivate: [AuthGuard],
    component: Home
  },
];
