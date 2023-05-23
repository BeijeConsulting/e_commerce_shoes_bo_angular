import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { MAT_DATE_FORMATS } from '@angular/material/core';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  previews: string[] = [];
  productImages: any = [];

  productSizes: any = [];

  productSize: any = {
    is_listed: true,
    quantity: null,
    selling_price: null,
    size: null,
  };

  sizeError: string = '';

  hide: boolean = true;

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  ngOnInit(): void {
    if (this.input.controlType === 'imagepicker') {
      if (this.input.value) {
        this.productImages = this.input.value;
      }
    }

    if (this.input.controlType === 'productSize') {
      if (this.input.value) {
        this.productSizes = this.input.value;
      }
    }
  }

  addSizes(inputKey: string): void | string {
    if (
      !this.productSize.quantity ||
      !this.productSize.selling_price ||
      !this.productSize.size
    ) {
      return (this.sizeError = 'emptyInputs');
    }

    const index = this.productSizes.findIndex(
      (item: any) => item.size === this.productSize.size
    );

    if (index > -1) {
      return (this.sizeError = 'alreadySelectedSize');
    }

    this.sizeError = '';

    this.productSizes.push(this.productSize);

    this.form.get(inputKey)?.setValue(this.productSizes);

    this.productSize = {
      is_listed: true,
      quantity: null,
      selling_price: null,
      size: null,
    };

    // console.log(this.form);
  }

  removeFromSizes(index: number) {
    this.productSizes.splice(index, 1);
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  selectFiles(event: any, inputKey: string): void {
    /* console.log('selected file: ', event);
    console.log('inputKey:', inputKey);
    console.log(event.target.files[0]); */

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.productImages.push(this.getImageObj(reader.result));
        /* this.base64Files.push(this.getImageObj(reader.result));
        this.selectedFileNames.push(file.name); */
      }
      this.form.get(inputKey)?.setValue(this.productImages);
    };
    reader.onerror = () => {
      console.log('Reading File Error');
    };
  }

  getImageObj(imagePath: string): object {
    let imageNumber = 0;

    if (this.productImages && this.productImages.length > 0) {
      imageNumber = this.productImages.length;
    }

    return {
      altEng: 'Product Image',
      altIt: 'Immagine Prodotto',
      imageNumber: imageNumber,
      type: 'desktop',
      imagePath,
    };
  }

  clearImages(inputKey: string): void {
    this.productImages = [];

    this.form.get(inputKey)?.setValue([]);
  }
}
