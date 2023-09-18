import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColoniesServiceService {

  colonies: Colonie[] =[]; // Assuming you have an array to store ruches

  constructor() {
    // Initialize with some sample data
    this.colonies =[
      {name:'colonie 1',location:'loc 1'}];
    }
    getColonies(): Colonie[] {
      return this.colonies;

    }
    getTotalColonies(): number {
      const colonies = this.getColonies(); 
      return colonies.length;
    }
    newColonyName: string = '';
    newColonyLocation: string = '';
    addColony(): void {
      if (this.newColonyName && this.newColonyLocation) {
        const newColony: Colonie= {
          name: this.newColonyName,
          location:this.newColonyLocation
        };
        this.colonies.push(newColony);
        this.newColonyName ='';
        this.newColonyLocation ='';
      }
    }
  }
  
  interface Colonie{
    name : string;
    location : string;
  }
  