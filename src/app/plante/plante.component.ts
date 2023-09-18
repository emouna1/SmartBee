import { Component, OnInit } from '@angular/core';
import { PlantesMelliferesService } from '../plantes-melliferes.service'; // Import the service here
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plante',
  templateUrl: './plante.component.html',
  styleUrls: ['./plante.component.css']
})
export class PlanteComponent implements OnInit {

  // Tableau pour stocker les informations sur les plantes mellifères
  plantes: any[] = [];

  // Variables pour gérer l'édition d'une plante
  editPlanteNom: string | null = null;
  editPlante: any = {};

  constructor(private plantesService: PlantesMelliferesService) {} // Inject the service

  ngOnInit() {
    this.loadPlantes();
  }

  loadPlantes() {
    this.plantesService.getPlantes().subscribe({
      next : (plantes) => {
        this.plantes = plantes; // Assign the retrieved plantes to the local array
      },
      error : (error) => {
        console.error('Failed to load plantes:', error);
      }}
    );
  }

  addPlante(nom: string, typeFleurs: string, floraison: string, abondanceNectarPollen: string, dureeFloraison: string, conditionsCroissance: string, nombreRuchesMax: number): void {
    const nouvellePlante = {
      nom: nom,
      typeFleurs: typeFleurs,
      floraison: floraison,
      abondanceNectarPollen: abondanceNectarPollen,
      dureeFloraison: dureeFloraison,
      conditionsCroissance: conditionsCroissance,
      nombreRuchesMax: nombreRuchesMax
    };

    this.plantesService.addPlante(nouvellePlante).subscribe({
      next : (response) => {
        this.plantes.push(nouvellePlante); // Add the new plante to the local array
        this.resetPlanteForm(); // Reset the form after adding
      },
      error : (error) => {
        console.error('Failed to add plante:', error);
      }
     } );
  }

  updatePlante(): void {
    // Rechercher la plante à modifier dans le tableau des plantes
    const index = this.plantes.findIndex(plante => plante.nom === this.editPlanteNom);
    if (index !== -1) {
      this.plantesService.updatePlante(this.editPlante).subscribe({
        next : (response) => {
          this.plantes[index] = this.editPlante; // Update the local array after successful update
          this.resetEditPlanteForm(); // Reset the edit form after update
        },
       error :  (error) => {
          console.error('Failed to update plante:', error);
        }}
      );
    }
  }

  deletePlante(plante: any): void {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete plant with ID '${plante.id}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.plantes.indexOf(plante);
        if (index !== -1) {
          this.plantesService.deletePlante(plante.id).subscribe({
            next: (response) => {
              Swal.fire('Deleted!', 'The plant has been deleted.', 'success');
              this.plantes.splice(index, 1);
            },
            error: (error) => {
              console.error('Failed to delete plant:', error);
              Swal.fire('Error', 'Failed to delete plant', 'error');
            }
          });
        }
      }
    });
  }

  editPlanteForm(nom: string): void {
    this.editPlanteNom = nom;
    // Rechercher la plante à modifier dans le tableau des plantes
    const plante = this.plantes.find(plante => plante.nom === nom);
    if (plante) {
      console.log(this.editPlante)
      // Copier les informations de la plante à modifier dans l'objet d'édition
      this.editPlante = { ...plante };
    }
  }

  resetPlanteForm(): void {
    // Implement the reset logic here if needed
  }

  resetEditPlanteForm(): void {
    this.editPlanteNom = null;
    this.editPlante = {};
  }
}

