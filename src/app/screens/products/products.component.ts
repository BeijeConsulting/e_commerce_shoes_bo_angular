import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private router: Router) {}

  addProduct() {
    this.router.navigate(['dashboard/products/add-product']);
  }
}
