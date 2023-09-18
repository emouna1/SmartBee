import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService,private router: Router) {}
  title = 'SmartBee';
  ngOnInit() {
    console.log('ngOnInit called');
    // Check the authentication status on app initialization
    this.authService.checkAuthentication().then((authenticated: boolean) => {
      if (!authenticated) {
        // If the user is not authenticated, redirect them to the login page
        this.router.navigate(['/login']);
      } else {
        // If the user is authenticated, redirect them to the dashboard page
        this.router.navigate(['/dashboard']);
      }
    });
  }
  onLogout(): void {
    this.authService.logout(); // Call the logout method
    // Optionally, navigate to a different route or perform other actions after logout
  }
}






