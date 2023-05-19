import { Component } from '@angular/core';

// Router
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: object[][];
  productsLenght: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const response = this.route.snapshot.data['productsResolver'];
    this.products = [...response.products];
    this.productsLenght = response.results;
  }

  addProduct() {
    this.router.navigate(['dashboard/products/add-product']);
  }

  getPaginatedProducts(e: any) {
    const page = e.pageIndex + 1;
    const perPage = e.pageSize;
    this.productService.getProducts(page, perPage, 'it').subscribe((res) => {
      this.products = res.products;
    });
  }
}
