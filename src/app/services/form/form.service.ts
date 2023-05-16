import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DateInput } from 'src/app/classes/forms/DateInput';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { SelectInput } from 'src/app/classes/forms/SelectInput';
import { TextInput } from 'src/app/classes/forms/TextInput';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // TODO: get from a remote source of question metadata
  getUserForm() {
    const questions: InputBase<string>[] = [
      new TextInput({
        key: 'id',
        label: 'Id',
        required: true,
        value: '',
        order: 1,
      }),

      new TextInput({
        key: 'lastName',
        label: 'lastName',
        required: true,
        value: '',
        order: 2,
      }),

      new TextInput({
        key: 'firstName',
        label: 'firstName',
        required: true,
        value: '',
        order: 3,
      }),

      new TextInput({
        key: 'phoneNumber',
        label: 'phoneNumber',
        required: true,
        value: '',
        order: 4,
      }),

      new TextInput({
        key: 'email',
        label: 'email',
        required: true,
        value: '',
        order: 5,
      }),

      new DateInput({
        key: 'date',
        label: 'date',
        value: '',
        required: true,
        order: 6,
      }),

      new SelectInput({
        key: 'role',
        label: 'role',
        options: [
          { key: 'customer', value: 'Customer' },
          { key: 'admin', value: 'Admin' },
          { key: 'dataEntry', value: 'Data Entry' },
          { key: 'marketing', value: 'Marketing' },
        ],
        order: 7,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
