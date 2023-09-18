import { Component,OnInit } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css']
})
export class NewChartComponent {
   chartOptions = {
    animationEnabled: true,
    title: {
      text: "Flowering Months and Hive Counts by Flower Type"
    },
    axisX: {
      title: "Flower Type"
    },
    axisY: {
      title: "Number of Hives",
      includeZero: true
    },
    axisY2: {
      title: "Flowering Months",
      labelFormatter: function (e: { value: any; }) {
        return CanvasJS.formatDate(e.value, "MMM YYYY");
      }
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      fontSize: 14,
      itemclick: this.toggleDataSeries
    },
    data: [
      {
        type: "column",
        name: "Number of Hives",
        showInLegend: true,
        dataPoints: [
          { label: "Calypteus", y: 100 },
          { label: "Bourrache", y: 150 },
          { label: "Arbosier", y: 120 }
        ]
      },
      {
        type: "line",
        name: "Flowering Months",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { label: "Calypteus", y: new Date(2022, 2).getTime() },
          { label: "Bourrache", y: new Date(2022, 4).getTime() },
          { label: "Arbosier", y: new Date(2022, 6).getTime() }
        ]
      }
    ]
  };
  
   toggleDataSeries(e: { dataSeries: { visible: boolean; }; chart: { render: () => void; }; }) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
  

}




  



 

