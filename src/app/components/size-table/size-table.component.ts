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
  displayedColumns: string[] = ['size', 'quantity', 'price'];
}
