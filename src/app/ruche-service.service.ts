import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class RucheService {
  ruches: Ruche[] =[]; 

  constructor() {
    this.ruches = [
      {id:1,nom:'Ruche 1',localisation: 'Location 1'},
      {id:2,nom:'Ruche 2',localisation: 'Location 2'},
      {id:3,nom:'Ruche 3',localisation: 'Location 3'}
    ];
  }

  getRuches(): Ruche[] {
    return this.ruches;
  }
  getTotalRuches(): number {
    const ruches = this.getRuches(); 
    return ruches.length;
  }
  addRuche(nom:string,localisation:string):void {
    const ruche: Ruche ={
      id: this.generateUniqueId(),
      nom:nom,
      localisation:localisation
    };
    this.ruches.push(ruche);
  }
  editRuche(ruche: Ruche): void {
    const index = this.ruches.findIndex(r => r.id === ruche.id);
    if (index !== -1) {
      this.ruches[index] = ruche;
    }
  }
  deleteRuche(ruche: Ruche): void {
    this.ruches = this.ruches.filter(r => r.id !== ruche.id);
  }
  private generateUniqueId(): number {
    const uniqueId = Math.floor(Math.random() * 1000) + 1;
    return uniqueId;
  }
}

interface Ruche {
  id: number;
  nom: string;
  localisation: string;
}