import { Component, OnInit } from '@angular/core'
import { ZoneserviceService } from '../zoneservice.service'; // Import the service here
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zone-species',
  templateUrl: './zone-species.component.html',
  styleUrls: ['./zone-species.component.css']
})
export class ZoneSpeciesComponent implements OnInit {

  // Array to store information about zones
  zones: any[] = [];

  // Variables to manage zone editing
  editZoneId: number | null = null;
  editZone: any = {};

  constructor(private zonesService: ZoneserviceService) {} // Inject the service

  ngOnInit() {
    this.loadZones();
  }

  loadZones() {
    this.zonesService.getZones().subscribe({
      next: (zones) => {
        this.zones = zones; // Assign the retrieved zones to the local array
      },
      error: (error) => {
        console.error('Failed to load zones:', error);
      }
    });
  }

 
  addZone(id: number ,nom: string, region: string): void {
    console.log('Adding zone:', nom, region); // Log input values
  
    if (nom.trim() === '' || region.trim() === '') {
      console.log('Name and region cannot be empty');
      return;
    }
  
    const newZone = {
      id: id,
      nom: nom,
      region: region
    };
  
    console.log('New zone object:', newZone); // Log new zone object before sending
  
    this.zonesService.addZone(newZone).subscribe({
      next: (response) => {
        console.log('Zone added successfully:', response); // Log successful response
        this.zones.push(response); // Assuming the server responds with the added zone
        this.resetZoneForm(); // Reset the form after adding
      },
      error: (error) => {
        console.error('Failed to add zone:', error); // Log error response
      }
    });
  }
  
    
  
    
  

 











  updateZone(): void {
    // Find the zone to update in the local array
    const index = this.zones.findIndex(zone => zone.id === this.editZoneId);
    if (index !== -1) {
      this.zonesService.updateZone(this.editZone).subscribe({
        next: (response) => {
          this.zones[index] = this.editZone; // Update the local array after successful update
          this.resetEditZoneForm(); // Reset the edit form after update
        },
        error: (error) => {
          console.error('Failed to update zone:', error);
        }
      });
    }
  }

  deleteZone(zone: any): void {
    const index = this.zones.indexOf(zone);
    if (index !== -1) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this zone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.zonesService.deleteZone(zone.id).subscribe({
            next: (response) => {
              this.zones.splice(index, 1);
              Swal.fire('Deleted!', 'The zone has been deleted.', 'success');
            },
            error: (error) => {
              console.error('Failed to delete zone:', error);
              Swal.fire('Error', 'Failed to delete zone', 'error');
            }
          });
        }
      });
    }
  }

  editZoneForm(id: number): void {
    this.editZoneId = id;
    // Find the zone to edit in the local array
    const zone = this.zones.find(zone => zone.id === id);
    if (zone) {
      // Copy the zone information to the edit object
      this.editZone = { ...zone };
    }
  }

  resetZoneForm(): void {
    // Implement the reset logic here if needed
  }

  resetEditZoneForm(): void {
    this.editZoneId = null;
    this.editZone = {};
  }
}
