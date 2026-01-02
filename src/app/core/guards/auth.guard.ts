import { Injectable } from "@angular/core";
import { CanActivate, CanMatch, Router, UrlTree } from "@angular/router";
import { authReady, AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) this.router.createUrlTree(['/login']);
    return true;
  }
}