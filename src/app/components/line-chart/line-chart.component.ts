import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements AfterViewInit {
  @Input() chartId: string = '';
  @Input() label: string = '';
  @Input() data: [][] = [];
  chart?: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartId, {
      type: 'line',
      data: {
        labels: this.data[0],
        datasets: [
          {
            label: this.label,
            data: this.data[1],
            backgroundColor: ['#EAF5FF95'],
            borderColor: ['#39f'],
            borderWidth: 3,
            fill: true,
            tension: 0.4,
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
