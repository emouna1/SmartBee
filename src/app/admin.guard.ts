
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your authentication service

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the user is an admin (you should implement this logic in your AuthService)
    if (this.authService.isAdmin()) {
      // User has admin privileges, allow access
      return true;
    } else {
      // User does not have admin privileges, navigate to 'access-denied'
      this.router.navigate(['/access-denied']);
      return false; // Deny access
    }
  }
    
    
    
    
  }

