import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { Feed } from './feed/feed';
import { PostInput } from "./post-input/post-input";
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  imports: [Feed, PostInput, MatButtonModule, MatToolbarModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router: Router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
