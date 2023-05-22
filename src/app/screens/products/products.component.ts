import { Component, OnInit } from '@angular/core';

// Router
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: object[][];
  productsLenght: number;
  page: number = 1;
  perPage: number = 5;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const response = this.route.snapshot.data['productsResolver'];
    this.products = [...response.products];
    this.productsLenght = response.results;
  }

  ngOnInit(): void {
    this.productService.products.subscribe((res) => {
      console.log('utente eliminato', res);
      this.products = [...res.products];
      this.productsLenght = res.results;
    });
  }

  addProduct() {
    this.router.navigate(['dashboard/products/add-product']);
  }

  getPaginatedProducts(e: any) {
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;

    this.productService.getProducts(this.page, this.perPage, 'it');
  }
}
