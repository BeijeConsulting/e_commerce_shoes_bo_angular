import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements AfterViewInit {
  @Input() chartId: string = '';
  @Input() label: string = '';
  @Input() data: [][] = [];
  chart?: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartId, {
      type: 'bar',
      data: {
        labels: this.data[0],
        datasets: [
          {
            label: this.label,
            data: this.data[1],
            backgroundColor: ['#39f'],
            borderRadius: 10,
            barPercentage: 0.1,
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
