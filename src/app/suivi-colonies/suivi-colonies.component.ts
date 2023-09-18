
import { Component } from '@angular/core';
import { ColoniesServiceService } from '../colonies-service.service';

@Component({
  selector: 'app-suivi-colonies-component',
  templateUrl: './suivi-colonies.component.html',
  styleUrls: ['./suivi-colonies.component.css'],
 
})
export class SuiviColoniesComponent {
  colonies: Colonie[] = [];
  newColonyName: string = '';
  newColonyLocation: string = '';

  constructor(private coloniesService: ColoniesServiceService) {}

  addColony(): void {
    if (this.newColonyName && this.newColonyLocation) {
      const newColony: Colonie = {
        name: this.newColonyName,
        location: this.newColonyLocation
      };
    
        this.colonies.push(newColony);
        
    }
  }
}

interface Colonie {
  name: string;
  location: string;
}