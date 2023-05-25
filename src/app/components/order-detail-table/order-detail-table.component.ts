import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { orderDetail } from 'src/app/interfaces/Order';

@Component({
  selector: 'app-order-detail-table',
  templateUrl: './order-detail-table.component.html',
  styleUrls: ['./order-detail-table.component.css'],
})
export class OrderDetailTableComponent implements OnInit {
  @Input() orderDetails!: orderDetail;
  displayedColumns: string[] = [
    'product_id',
    'image',
    'brand',
    'name',
    'category',
    'selling_price',
    'color',
  ];

  dataSource!: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.orderDetails.products);
    // console.log('this.dataSource order detaile table', this.dataSource);
  }
}
