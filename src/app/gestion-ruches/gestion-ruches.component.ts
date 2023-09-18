import { Component, OnInit } from '@angular/core';
import { RucheService } from '../ruche-service.service';

@Component({
  selector: 'app-gestion-ruches-component',
  templateUrl: './gestion-ruches.component.html',
  styleUrls: ['./gestion-ruches.component.css']
})
export class GestionRuchesComponent implements OnInit {
  ruches: Ruche[] = [];

  constructor(private rucheService: RucheService) {}
  // Properties for the edit form
editRucheId: number | null = null;
editRuche: Ruche = { id: 0, nom: '', localisation: '' };

// Method for handling the edit form
editRucheForm(rucheId: number): void {
  this.editRucheId = rucheId;
  const ruche = this.ruches.find(r => r.id === rucheId);
  if (ruche) {
    this.editRuche = { ...ruche };
  }
}
// Method for updating the ruche
updateRuche(): void {
  const index = this.ruches.findIndex(r => r.id === this.editRucheId);
  if (index !== -1) {
    const updatedRuche: Ruche = { ...this.ruches[index], nom: this.editRuche.nom, localisation: this.editRuche.localisation };
    this.ruches[index] = updatedRuche;
    this.editRucheId = null;
    this.editRuche = { id: 0, nom: '', localisation: '' };
  }
}
  ngOnInit(): void {
    this.getRuches(); // Fetch the list of ruches when the component initializes
  }

  getRuches(): void {
    this.ruches = this.rucheService.getRuches(); // Use the RucheService to fetch the ruches
  }
    
  addRuche(nom: string,emplacement: string): void {
    const ruche: Ruche = {
      id:this.generateUniqueId(),
      nom:nom,
      localisation:emplacement
    };
    this.ruches.push(ruche);
  }
  
  deleteRuche(ruche: Ruche): void {
    // Logic for deleting a ruche
    this.ruches = this.ruches.filter(r => r.id !== ruche.id);
  }

  private generateUniqueId(): number {
    // Logic for generating a unique ID for a new ruche
    // You can implement your own unique ID generation logic here
    return Math.floor(Math.random() * 1000);
  }
}

interface Ruche {
  id: number;
  nom: string;
  localisation: string;
  [key: string]: any;
}
