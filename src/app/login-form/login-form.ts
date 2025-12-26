import { Component, inject } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  userService = inject(UserService);

  submitCredentials(username: string, password: string) {
    this.userService.login(username, password).subscribe({
      next: res => console.log('success', res),
      error: err => console.error('error', err)
    });
  }
}
