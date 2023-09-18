import { Component, OnInit } from '@angular/core';
import { RecoltesServiceService} from '../recoltes-service.service'; // Replace with the actual path to the Recolte service

@Component({
  selector: 'app-gestion-recoltes-component',
  templateUrl: './gestion-recoltes.component.html',
  styleUrls: ['./gestion-recoltes.component.css']
})
export class GestionRecoltesComponent implements OnInit {
  recoltes: Recolte[] = [];

  constructor(private recoltesService: RecoltesServiceService) {}

  // Properties for the edit form
  editRecolteId: number | null = null;
  editRecolte: Recolte = { id: 0, dateRecolte:null, quantiteMiel: 0 };

  // Method for handling the edit form
  editRecolteForm(recolteId: number): void {
    this.editRecolteId = recolteId;
    const recolte = this.recoltes.find(r => r['id'] === recolteId);
    if (recolte) {
      this.editRecolte = { ...recolte };
    }
  }

  // Method for updating the recolte
  updateRecolte(): void {
    const index = this.recoltes.findIndex(r => r['id'] === this.editRecolteId);
    if (index !== -1) {
      const updatedRecolte: Recolte = { ...this.recoltes[index], dateRecolte: this.editRecolte.dateRecolte, quantiteMiel: this.editRecolte.quantiteMiel };
      this.recoltes[index] = updatedRecolte;
      this.editRecolteId = null;
      this.editRecolte = { id: 0, dateRecolte:null, quantiteMiel: 0 };
    }
  }
  ngOnInit(): void {
    this.getRecoltes(); // Fetch the list of recoltes when the component initializes
  }

  getRecoltes(): void {
    this.recoltesService.getRecoltes().subscribe(recoltes => {
      this.recoltes = recoltes; // Assign the fetched recoltes to the component property
    });
  }
  
    
  enregistrerRecolte(): void {
    // Logic for saving a new recolte
    const recolte: Recolte = {
      id: this.generateUniqueId(),
      dateRecolte: this.editRecolte.dateRecolte,
      quantiteMiel: this.editRecolte.quantiteMiel
    };
    this.recoltes.push(recolte);
  }
  deleteRecolte(recolte: Recolte): void {
    // Logic for deleting a recolte
    this.recoltes = this.recoltes.filter(r => r['id']!== recolte['id']);
  }

  private generateUniqueId(): number {
    // Logic for generating a unique ID for a new recolte
    // You can implement your own unique ID generation logic here
    return Math.floor(Math.random() * 1000);
  }
}


interface Recolte{
  dateRecolte:Date|null;
  quantiteMiel:number|null;
  [key: string]: any;

}