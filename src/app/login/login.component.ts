import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router  ) {}
 
  
  async login() {
    try {
      console.log('Logging in...'); // Add this log
      const isAuthenticated = await this.authService.login(this.userName, this.password);
      console.log('Authentication result:', isAuthenticated); // Add this log
  
      if (isAuthenticated) {
        // Check if there's a redirectUrl in AuthService
        const redirectUrl = this.authService.redirectUrl;
        console.log('Redirect URL:', redirectUrl); // Add this log
  
        if (redirectUrl) {
          // Clear the redirectUrl to avoid further redirects
          console.log('Navigating to:', redirectUrl); // Add this log
          this.router.navigateByUrl(redirectUrl);

        } else {
          // No redirectUrl, so navigate to the default route (e.g., dashboard)
          console.log('Navigating to default route (/dashboard)'); // Add this log
          this.router.navigate(['/dashboard']);

        }
        this.authService.clearRedirectUrl();

        // Display success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been successfully logged in!',
        });
      } else {
        // Authentication failed, show error message to the user using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: 'Invalid username or password. Please try again.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  
  
}


