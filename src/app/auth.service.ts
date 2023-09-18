import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost'; // Replace with the base URL of your API

  private currentUser: any | null = null; // Initialize as null
  private isAuthenticatedFlag: boolean = false;
  redirectUrl: string | null = null; // Property to store the intended URL for redirection

  constructor(private http: HttpClient) {}

  // Attempt to authenticate the user and retrieve user data
// auth.service.ts
// auth.service.ts

  // Rest of your AuthService methods.
  async login(username: string, password: string): Promise<boolean> {
    const url = `${this.baseUrl}/login.php`; // Replace with your login API endpoint
    console.log("this username ",username);
    console.log("this password ",password);

    const credentials = {
      username: username,
      password: password,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    try {
      console.log('Sending login request to server...');
      const response = await this.http.post<any>(url, credentials, { headers }).toPromise();
  
      console.log('Response from server:', response);
  
      if (response && response.user) {
        console.log('Authentication successful');
        this.currentUser = {
          id: response.user.id,
          username: response.user.name, // Update to 'name' based on your database
          permission_key: response.user.permission_key,
          // Map other properties as needed
        }; // Store the current user data
        this.isAuthenticatedFlag = true; // Set authentication flag to true
        return true; // Authentication successful
      } else {
        console.log(response);

        console.log(response.user);
        console.log('Authentication failed');
        return false; // Authentication failed
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  
    // Check if the user is an admin based on user data retrieved from login
    isAdmin(): boolean {
      // Check the user's role or permissions in the retrieved user data
      console.log('Permission Key:', this.currentUser?.permission_key);
      return this.currentUser?.permission_key === '100A1';
    }
  
    logout(): void {
      // Clear user authentication state
      this.currentUser = null;
      this.isAuthenticatedFlag = false;
      // Perform any other cleanup, e.g., remove tokens from local storage
      localStorage.removeItem('token'); // Remove the authentication token
    }
  
    checkAuthentication(): Promise<boolean> {
      const token = localStorage.getItem('token');
      // Return true if the token exists (user is authenticated), otherwise return false
      return Promise.resolve(!!token);
    }
  
  
  

  
  

  // Method to update a user account
  updateAccount(accountData: any): Observable<any> {
    const url = `${this.baseUrl}/updateAccount.php`; // Replace with the URL of your PHP update account API
    return this.http.put<any>(url, accountData);
  }

  // Method to delete a user account
  deleteAccount(accountId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteAccount.php?id=${accountId}`; // Replace with your API endpoint for deleting a zone
    return this.http.get<any>(url);
  }

  getAccounts(): Observable<any[]> {
    const url = `${this.baseUrl}/getAccounts.php`; // Replace with the URL of your PHP get-accounts API
    return this.http.get<any[]>(url);
  }
    
   // Method to register a new user
   registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/register.php`; // Replace with the URL of your PHP register API
    console.log("Adding zone:");
    return this.http.post<any>(url, userData);
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  // Clear the redirectUrl when it's no longer needed
  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }
}



