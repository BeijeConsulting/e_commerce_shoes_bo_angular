import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  addProductForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addProductForm$ = formService.addProductForm();
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
  }
}
