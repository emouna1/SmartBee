
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantesMelliferesService {
  private apiUrl = 'http://localhost'; // Replace with your XAMPP PHP backend URL

  constructor(private http: HttpClient) { }

  // Function to get all plantes mellifères from the backend
  getPlantes(): Observable<any[]> {
    const url = `${this.apiUrl}/getPlantes.php`;
    return this.http.get<any[]>(url);
  }

  // Function to add a new plante mellifère to the backend
  addPlante(plante: any): Observable<any> {
    const url = `${this.apiUrl}/addPlante.php`;
    console.log("Adding plante:"); 
    return this.http.post<any>(url, plante);

  }

  // Function to update an existing plante mellifère on the backend
  updatePlante(plante: any): Observable<any> {
    const url = `${this.apiUrl}/updatePlante.php`;
    return this.http.post<any>(url, plante);
  }

  // Function to delete a plante mellifère from the backend
  deletePlante(planteId: number): Observable<any> {
    const url = `${this.apiUrl}/deletePlante.php?id=${planteId}`;
    return this.http.get<any>(url);
  }
}
