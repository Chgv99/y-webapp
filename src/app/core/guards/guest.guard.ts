import { Injectable } from "@angular/core";
import { CanActivate, CanMatch, Router, UrlTree } from "@angular/router";
import { authReady, AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log('guest guard')
    if (this.authService.isLoggedIn()) return this.router.createUrlTree(['/home']);
    return true;
  }
}