import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent {
  editOrderForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.editOrderForm$ = formService.editOrderForm({
      status: 'Completed',
    });
  }

  onSubmit(data: any) {
    console.log('EditOrderScreen Submit: ', data);
  }
}
