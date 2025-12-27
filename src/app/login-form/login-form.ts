import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  submitCredentials(username: string, password: string) {
    this.userService.login(username, password).subscribe({
      next: res => {
        this.authService.setToken(res.token);
        this.router.navigate(['/home'])
      },
      error: err => console.error('error', err)
    });
  }
}
