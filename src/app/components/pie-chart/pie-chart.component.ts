import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements AfterViewInit {
  @Input() chartId: string = '';
  @Input() label: string = '';
  @Input() data: [][] = [];
  chart?: Chart<any>;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartId, {
      type: 'pie',
      data: {
        labels: this.data[0],
        datasets: [
          {
            label: this.label,
            data: this.data[1],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
