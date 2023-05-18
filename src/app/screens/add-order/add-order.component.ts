import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent {
  addOrderForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addOrderForm$ = formService.addOrderForm();
  }

  onSubmit(data: any) {
    console.log('AddOrderScreen Submit: ', data);
  }
}
