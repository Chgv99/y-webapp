import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { PageService } from '../core/services/page.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  router: Router = inject(Router);
  authService = inject(AuthService);
  userService = inject(UserService);
  pageService = inject(PageService);

  logoUrl = "assets/images/header-logo.png"

  onHome() {
    this.router.navigate(['/home']);
  }

  onProfile() {
    this.router.navigate(['/' + this.userService.currentUser()?.username]);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
