import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements AfterViewInit {
  @Input() chartId: string = '';
  chart?: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartId, {
      type: 'bar',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow',
          'Green',
          'Purple',
          'Orange',
          'Red',
          'Blue',
          'Yellow',
          'Green',
          'Purple',
          'Orange',
        ],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
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
