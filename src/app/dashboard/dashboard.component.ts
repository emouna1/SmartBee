import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy{
  barChartData: any[] = []; // Initialize with an empty array or default data
  barChartView: [number, number] = [800,800]; // Adjust dimensions based on your needs
  dynamicData: any[] = []; // Dynamic data array
  staticData: any[] = []; // Static copy of dynamic data
  
  
    exampData: any[] = [
    { nom: 'Eucalyptus serjanti', durationInDays: 61 },
    { nom: 'Borrache', durationInDays: 121 },
    { nom: 'Bruyère', durationInDays: 76 }
    ];
  
  
  
  
  
  
  

  // Define other properties as needed
  barChartXAxis = true;
  barChartYAxis = true;
  barChartLegend = true;
  barChartXAxisLabel = 'nom';
  barChartYAxisLabel = 'durationInDays';
  
  
  private subscription: Subscription = new Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.dashboardService.fetchData().subscribe(
        (data) => {
          console.log('Dynamic data fetched:', data);
          this.dynamicData=data;
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      )
    );
    

  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
