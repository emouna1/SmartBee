import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost/getPlants.php').pipe(
      map((data: any[]) => {
        console.log('Raw data from API:', data); // Log the raw data from the API
        return data.map(item => {
          const durationInDays = this.calculateDurationInDays(
            parseInt(item.startMonth, 10),
            parseInt(item.startDay, 10),
            parseInt(item.endMonth, 10),
            parseInt(item.endDay, 10)
          );
          console.log('Processing item:', item); // Log the item being processed
          console.log('Calculated duration:', durationInDays);
          return {
            nom: item.name,
            durationInDays: durationInDays
          };
        });
      })
    );
  }
  

  private calculateDurationInDays(startMonth: number, startDay: number, endMonth: number, endDay: number): number {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Number of days in each month

    let durationInDays = 0;

    for (let month = startMonth; month <= endMonth; month++) {
        if (month === startMonth) {
            durationInDays += daysInMonth[month] - startDay + 1; // Add days in starting month
        } else if (month === endMonth) {
            durationInDays += endDay; // Add days in ending month
        } else {
            durationInDays += daysInMonth[month]; // Add full months
        }
    }

    return durationInDays;
}



  
  
  
  
  
  
  


}

