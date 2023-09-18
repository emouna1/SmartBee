import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.authService.redirectUrl = state.url;

    if (await this.authService.checkAuthentication()) {
      return true; // User is authenticated, allow access
    } else {
      // Save the intended URL for redirection after login
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']); // User is not authenticated, redirect to the login page

      return false; // Deny access
    }
  }
  
}

