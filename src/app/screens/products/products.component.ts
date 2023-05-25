import { Component, OnInit } from '@angular/core';

// Router
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private productService: ProductService,
    private translate: TranslateService
  ) {
    const response = this.route.snapshot.data['productsResolver'];
    this.products = [...response.products];
    this.productsLenght = response.results;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((res) =>
      this.productService.getProducts(this.page, this.perPage, res.lang)
    );

    this.productService.products.subscribe((res) => {
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
    const language = this.translate.currentLang;
    this.productService.getProducts(this.page, this.perPage, language);
  }
}
