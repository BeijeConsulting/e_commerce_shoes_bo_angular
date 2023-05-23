import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from 'src/app/interfaces/Order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orders: Order[];

  monthLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  incomePerMonth: any = [];
  incomePerNation: any = [];
  ordersPerMonth: any = [];

  constructor(private route: ActivatedRoute) {
    this.orders = this.route.snapshot.data['dashboardResolver'].orders;
    console.log('TUTTI GLI ORDINI', this.orders);
  }

  ngOnInit(): void {
    this.incomePerNation = this.getIncomePerNation();
    this.incomePerMonth = this.getIncomePerMonth();
    this.ordersPerMonth = this.getOrdersPerMonth();
  }

  getIncomePerNation() {
    let nations: any = [];
    let incomes: any = [];
    let result: any = [];
    const data: any = {};

    this.orders.forEach((item) => {
      const nation: string = item.address.split(',')[0];
      if (isNaN(data[nation])) data[nation] = 0;
      data[nation] += item.total_price;
    });
    for (let key in data) {
      nations.push(key);
      incomes.push(data[key]);
    }

    result.push(nations, incomes);
    console.log('ORDINI PER NAZIONE', result);
    return result;
  }

  getIncomePerMonth() {
    let incomes: any = [];

    this.orders.forEach((item) => {
      const monthIndex: number = new Date(item.created_at).getMonth();
      if (isNaN(incomes[monthIndex])) incomes[monthIndex] = 0;
      incomes[monthIndex] += item.total_price;
    });

    for (let i = 0; i < 12; i++) {
      if (!incomes[i]) incomes[i] = 0;
    }

    console.log('INCOME PER MESE', [this.monthLabels, incomes]);
    return [this.monthLabels, incomes];
  }

  getOrdersPerMonth() {
    let orders: any = [];

    this.orders.forEach((item) => {
      const monthIndex: number = new Date(item.created_at).getMonth();
      if (isNaN(orders[monthIndex])) orders[monthIndex] = 0;
      orders[monthIndex] += 1;
    });

    for (let i = 0; i < 12; i++) {
      if (!orders[i]) orders[i] = 0;
    }

    console.log('ORDINI PER MESE', [this.monthLabels, orders]);
    return [this.monthLabels, orders];
  }
}
