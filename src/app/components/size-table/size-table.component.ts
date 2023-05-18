import { Component, Input } from '@angular/core';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-size-table',
  styleUrls: ['size-table.component.css'],
  templateUrl: 'size-table.component.html',
})
export class SizeTableComponent {
  @Input() data: object[] = [];
  dummyData: any = [
    {
      id: 232,
      createdAt: {
        year: 2023,
        month: 'APRIL',
        monthValue: 4,
        dayOfMonth: 5,
        hour: 18,
        minute: 5,
        second: 41,
        nano: 0,
        dayOfWeek: 'WEDNESDAY',
        dayOfYear: 95,
        chronology: {
          calendarType: 'iso8601',
          id: 'ISO',
        },
      },
      disabledAt: null,
      isListed: true,
      sellingPrice: 75,
      quantity: 48,
      size: 'W37',
      productId: 115,
      product: null,
    },
    {
      id: 233,
      createdAt: {
        year: 2023,
        month: 'APRIL',
        monthValue: 4,
        dayOfMonth: 5,
        hour: 18,
        minute: 5,
        second: 42,
        nano: 0,
        dayOfWeek: 'WEDNESDAY',
        dayOfYear: 95,
        chronology: {
          calendarType: 'iso8601',
          id: 'ISO',
        },
      },
      disabledAt: null,
      isListed: true,
      sellingPrice: 75,
      quantity: 19,
      size: 'W38',
      productId: 115,
      product: null,
    },
  ];
  displayedColumns: string[] = ['size', 'quantity', 'price'];
}
