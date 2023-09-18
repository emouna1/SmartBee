import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Function to get all zones from the backend
  getZones(): Observable<any[]> {
    const url = `${this.apiUrl}/getZ.php`; // Replace with your API endpoint for getting zones
    return this.http.get<any[]>(url);
  }

  // Function to add a new zone to the backend
  addZone(zones: any): Observable<any> {
    const url = `${this.apiUrl}/addZ.php`; // Replace with your API endpoint for adding a zone
    console.log("Adding zone:");
    return this.http.post<any>(url, zones);
  }

  // Function to update an existing zone on the backend
  updateZone(zones: any): Observable<any> {
    const url = `${this.apiUrl}/updateZ.php`; // Replace with your API endpoint for updating a zone
    console.log("updating zone:");
    return this.http.post<any>(url, zones);
  }
  
  // Function to delete a zone from the backend
  deleteZone(zoneName: string): Observable<any> {
    const url = `${this.apiUrl}/deleteZ.php?zone_name=${zoneName}`; // Replace with your API endpoint for deleting a zone
    return this.http.get<any>(url);
  }
  getSpecies(): Observable<any[]> {
    const url = `${this.apiUrl}/getPlantes.php`; 
    return this.http.get<any[]>(url);
  }

}
