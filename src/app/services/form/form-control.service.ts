import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ImagePicker } from 'src/app/classes/forms/ImagePicker';
import { InputBase } from 'src/app/classes/forms/InputBase';

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  addFormControl(input: InputBase<string>): FormControl<string | null> {
    const validatorsArr: ValidatorFn[] = [];
    let initialValue: string = '';

    if (input.required) {
      if (input.controlType === 'checkbox') {
        validatorsArr.push(Validators.requiredTrue);
      } else {
        validatorsArr.push(Validators.required);
      }
    }

    if (input.regexControl) {
      validatorsArr.push(Validators.pattern(input.regexControl));
    }

    if (input.value) {
      initialValue = input.value;
      console.log('initialValue: ', initialValue);
    }

    if (input.controlType === 'imagepicker' && input instanceof ImagePicker) {
      validatorsArr.push(Validators.minLength(input.minNumber));
    }

    return new FormControl(initialValue, validatorsArr);
  }

  toFormGroup(inputs: InputBase<string>[]) {
    const group: any = {};

    inputs.forEach((input) => {
      group[input.key] = this.addFormControl(input);
    });
    return new FormGroup(group);
  }
}
