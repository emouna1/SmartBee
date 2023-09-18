
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoltesServiceService {
  private recoltes: Recolte[] = [];

  constructor() {
    // Initialize with some sample data
    this.recoltes = [
      { id: 1, dateRecolte: new Date(), quantiteMiel: 10 },
      { id: 2, dateRecolte: new Date(), quantiteMiel: 15 },
      { id: 3, dateRecolte: new Date(), quantiteMiel: 8 },
    ];
  }

  // Method to retrieve all the recorded honey harvests
  getRecoltes(): Observable<Recolte[]> {
    return of(this.recoltes);
  }

  // Method to add a new honey harvest
  addRecolte(recolte: Recolte): Observable<Recolte> {
    const newRecolte = { ...recolte, id: this.generateId() };
    this.recoltes.push(newRecolte);
    return of(newRecolte);
  }

  // Method to update an existing honey harvest
  updateRecolte(recolte: Recolte): Observable<Recolte | null > {
    const index = this.recoltes.findIndex(r => r.id === recolte.id);
    if (index !== -1) {
      this.recoltes[index] = recolte;
      return of(recolte);
    }
    return of(null); // Return null if recolte with the given id is not found

  }

  // Method to delete a honey harvest
  deleteRecolte(id: number): Observable<void | null> {
    const index = this.recoltes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.recoltes.splice(index, 1);
      return of(undefined); // Return an observable with no value
    }
    return of(null); // Return null if recolte with the given id is not found
  }

  // Helper method to generate a unique ID for a new recolte
  private generateId(): number {
    return this.recoltes.length > 0 ? Math.max(...this.recoltes.map(r => r.id!)) + 1 : 1;
  }
}

interface Recolte {
  id?: number;
  dateRecolte: Date | null;
  quantiteMiel: number | null;
  [key: string]: any;
}