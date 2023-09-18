import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, max } from 'rxjs';
import { DataService } from '../data.service'; // Import your DataService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  zones: any[] = [];
  // Make sure to adjust the data type accordingly
  addZoneForm: FormGroup;
  displayedColumns: string[] = ['zoneName', 'speciesName', 'rucheCount', 'actions'];
  editingRowIndex: number = -1;
  editingFormGroup: FormGroup[] = [];
  editedZone: any; // Edited zone data

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.addZoneForm = this.formBuilder.group({
      zoneId: ['', Validators.required],
      zoneName: ['', Validators.required],
      speciesId: ['', Validators.required],
      speciesName: ['', Validators.required],
      rucheCount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });


  }

  
  ngOnInit() {
    this.loadZones();
  
    
  }

  loadZones() {
    this.dataService.getZones().subscribe(
      (zonesData: any[]) => {
        this.zones = zonesData;
      },
      (error: any) => {
        console.error("Error loading zones:", error);
      }
    );
  }
  

  
  
                  
  addZone() {
    if (this.addZoneForm.valid) {
      const newZoneData = this.addZoneForm.value;
  
      // Fetch the species by ID
      this.dataService.getSpecies().subscribe(
        (speciesData: any[]) => {
          console.log("All species data:", speciesData);
  
          const selectedSpecies = speciesData.find(species => species.id === newZoneData.speciesId);
          console.log("Selected species ID:", newZoneData.speciesId);
          console.log("Selected species:", selectedSpecies);
  
          if (!selectedSpecies) {
            console.log("Selected species not found.");
            return;
          }
  
          // Check if the number of hives exceeds the maximum allowed value for the selected species
          const maxAllowedHives = selectedSpecies.nombreRuchesMax;
          console.log("Max allowed hives:", maxAllowedHives);
          console.log("Current rucheCount:", newZoneData.rucheCount);
  
          if (parseInt(newZoneData.rucheCount, 10) > maxAllowedHives) {
            console.log("Can't add zone!");
            Swal.fire({
              title: `Maximum allowed hives is ${maxAllowedHives}. You cannot add this zone.`,
              // ... (rest of your Swal configuration)
            });
            return;
          } else {
            // Perform the add operation
            this.dataService.addZone(newZoneData).subscribe(
              () => {
                console.log("Zone added successfully.");
                this.loadZones();
                this.addZoneForm.reset();
              },
              (error) => {
                console.error("Error adding zone:", error);
              }
            );
          }
        },
        (error: any) => {
          console.error("Error loading species:", error);
        }
      );
    }
  }
  
  

  deleteZone(zone: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete zone '${zone.zone_name}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteZone(zone.zone_name).subscribe(() => {
          Swal.fire('Deleted!', 'The zone has been deleted.', 'success');
          this.loadZones();
        }, (error) => {
          console.error('Failed to delete zone:', error);
          Swal.fire('Error', 'Failed to delete zone', 'error');
        });
      }
    });
  }

  
  
  
  


  editZone(index: number) {
    console.log('Entering editZone for index:', index);
    this.editingRowIndex = index;
    this.editedZone = { ...this.zones[index] };
    console.log('Editing zone data:', this.editedZone);
    
    this.editingFormGroup[index] = this.formBuilder.group({
      zoneName: [this.editedZone.zone_name, Validators.required],
      speciesName: [this.editedZone.species_name, Validators.required],
      rucheCount: [this.editedZone.ruche_count, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    console.log('Editing form group:', this.editingFormGroup[index]);
  }
  
  saveEditedZone(index: number) {
    if (this.editingFormGroup[index].valid) {
      const editedZoneData = this.editingFormGroup[index].value;
      console.log('Edited zone data before update:', this.editedZone);
      
      this.editedZone.zone_name = editedZoneData.zoneName;
      this.editedZone.species_name = editedZoneData.speciesName;
      this.editedZone.ruche_count = editedZoneData.rucheCount;
  
      console.log('Updated zone data:', this.editedZone);
  
      // Call your dataService's updateZone function here to update the zone on the server
      this.dataService.updateZone(this.editedZone).subscribe(
        () => {
          console.log('Zone updated successfully.');
          this.loadZones(); // Refresh zone data
          this.editingRowIndex = -1; // Exit editing mode
          this.cdr.detectChanges(); 
        },
        (error) => {
          console.error("Error updating zone:", error);
        }
      );
    }
  }
  

  cancelEditing(index: number) {
    this.editingRowIndex = -1;
  }
}




