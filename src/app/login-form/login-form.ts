import { Component, inject } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  userService = inject(UserService);
  router = inject(Router);

  submitCredentials(username: string, password: string) {
    this.userService.login(username, password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home'])
      },
      error: err => console.error('error', err)
    });
  }
}
