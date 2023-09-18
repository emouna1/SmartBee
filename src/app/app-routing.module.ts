import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionRuchesComponent} from '../app/gestion-ruches/gestion-ruches.component'
import { GestionRecoltesComponent } from './gestion-recoltes/gestion-recoltes.component';
import { SuiviColoniesComponent } from './suivi-colonies/suivi-colonies.component';
import { ZoneComponent } from './zone/zone.component';
import { RegistrationComponent } from './registration/registration.component';
import { PlanteComponent } from './plante/plante.component';
import { ZoneSpeciesComponent } from '../app/zone-species/zone-species.component'
import { NewChartComponent } from './new-chart/new-chart.component';
const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full', },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard],},
  {path:'login',component:LoginComponent },
  { path: 'gestion-ruches', component: GestionRuchesComponent },
  { path: 'gestion-recoltes', component: GestionRecoltesComponent },
  { path: 'suivi-colonies', component: SuiviColoniesComponent },
  {path:'zone',component:ZoneComponent},
  {path:'registration',component:RegistrationComponent  },
  {path:"plante",component:PlanteComponent   },
  {path: "zoneS",component:ZoneSpeciesComponent },
  {path : "newChart",component: NewChartComponent },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

