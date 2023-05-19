import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: any;
  editProductForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.editProductForm$ = formService.editProductForm({
      brand: 'Nike',
      id: '13',
      images: 'images',
      listedPrice: '300',
      productName: 'Air',
      category: 'shoes',
      colour: 'white',
      englishDescription: 'english description',
      italianDescription: 'italian description',
      quantity: '3',
      size: '43',
      type: 'man',
    });

    const response = this.route.snapshot.data['productsResolver'];
    console.log(response);
    this.product = { ...response.product };
  }

  ngOnInit(): void {
    this.productService.products.subscribe((res) => {
      console.log('utente eliminato', res);
      /* this.products = [...res.products];
      this.productsLenght = res.results; */
    });
  }

  onSubmit(data: any) {
    console.log('EditProductScreen Submit: ', data);
  }
}
