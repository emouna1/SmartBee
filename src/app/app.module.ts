import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
import { AppComponent } from './app.component';
import { GestionRecoltesComponent} from './gestion-recoltes/gestion-recoltes.component';
import { GestionRuchesComponent} from './gestion-ruches/gestion-ruches.component';
import { SuiviColoniesComponent } from './suivi-colonies/suivi-colonies.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ZoneComponent} from './zone/zone.component';
import { LoginComponent } from './login/login.component';
import { PlanteComponent } from './plante/plante.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ZoneSpeciesComponent } from './zone-species/zone-species.component';
import { NewChartComponent } from './new-chart/new-chart.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RegistrationComponent } from './registration/registration.component';
@NgModule({
  declarations: [
    AppComponent,
    GestionRecoltesComponent,
    GestionRuchesComponent,
    SuiviColoniesComponent,
    ZoneComponent,
    LoginComponent,
    PlanteComponent,
    ZoneSpeciesComponent,
    NewChartComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule, // Import MatFormFieldModule
    MatInputModule, 
    ReactiveFormsModule,
    MatTableModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
