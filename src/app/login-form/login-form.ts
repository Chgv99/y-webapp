import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Feed } from "../home/feed/feed";
import { MatCardModule } from '@angular/material/card';
import { BlobBackground } from '../blob-background/blob-background';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  hide = signal(true);

  submitCredentials(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: res => {
        this.router.navigate(['/home'])
      },
      error: err => console.error('error', err)
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
