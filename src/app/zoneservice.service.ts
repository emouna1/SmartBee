

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ZoneserviceService {
    private apiUrl = 'http://localhost'; // Replace with your backend URL
  
    constructor(private http: HttpClient) {}
  
    // Function to get all zones from the backend
    getZones(): Observable<any[]> {
      const url = `${this.apiUrl}/getZones.php`; // Replace with your API endpoint for getting zones
      return this.http.get<any[]>(url);
    }
  
    // Function to add a new zone to the backend
    addZone(zones: any): Observable<any> {
      const url = `${this.apiUrl}/addZone.php`; // Replace with your API endpoint for adding a zone
      console.log("Adding zone:");
      return this.http.post<any>(url, zones);
    }
  
    // Function to update an existing zone on the backend
    updateZone(zones: any): Observable<any> {
      const url = `${this.apiUrl}/updateZone.php`; // Replace with your API endpoint for updating a zone
      console.log("updating zone:");
      return this.http.post<any>(url, zones);
    }
  
    // Function to delete a zone from the backend
    deleteZone(zoneId: number): Observable<any> {
      const url = `${this.apiUrl}/deleteZone.php?id=${zoneId}`; // Replace with your API endpoint for deleting a zone
      return this.http.get<any>(url);
    }
  
  }


