import { Component, inject } from '@angular/core';
import { Feed } from './feed/feed';
import { PostInput } from "./post-input/post-input";
import { AuthService } from '../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Feed, PostInput, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router: Router = inject(Router);
  authService = inject(AuthService);
  onLogout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
