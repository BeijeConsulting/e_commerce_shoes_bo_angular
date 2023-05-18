import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  editProductForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
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
  }

  onSubmit(data: any) {
    console.log('EditProductScreen Submit: ', data);
  }
}
