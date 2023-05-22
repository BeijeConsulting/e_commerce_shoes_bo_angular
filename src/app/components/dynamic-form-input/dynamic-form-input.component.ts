import { Component, Input } from '@angular/core';
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
export class DynamicFormInputComponent {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  selectedFiles?: FileList;
  base64Files: string[] = [];
  selectedFileNames: string[] = [];
  previews: string[] = [];
  productImages: Object[] = [];

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

  addSizes(inputKey: string): void | string {
    if (
      !this.productSize.quantity ||
      !this.productSize.selling_price ||
      !this.productSize.size
    ) {
      return (this.sizeError = 'Riempieri tutti i campi');
    }

    const index = this.productSizes.findIndex(
      (item: any) => item.size === this.productSize.size
    );

    if (index > -1) {
      return (this.sizeError = 'Taglia già selezionata');
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
    console.log(this.productSizes);
    this.productSizes.splice(index, 1);
    console.log(this.productSizes);
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  selectFiles(event: any, inputKey: string): void {
    console.log('selected file: ', event);
    console.log('inputKey:', inputKey);
    console.log(event.target.files[0]);

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.base64Files.push(reader.result);
        this.selectedFileNames.push(file.name);
      }
      this.form.get(inputKey)?.setValue(this.base64Files);
    };
    reader.onerror = () => {
      console.log('Reading File Error');
    };
  }

  uploadFiles(): void {
    if (this.base64Files.length < 3) return alert('Insert at least 3 images');

    const imageObj = this.base64Files.map((base64Image, index) => {
      return {
        altEng: 'Product Image',
        altIt: 'Immagine Prodotto',
        imageNumber: index,
        type: 'desktop',
        imagePath: base64Image,
      };
    });
    console.log('uploadFiles');
  }

  clearImages(inputKey: string): void {
    this.selectedFileNames = [];
    this.base64Files = [];

    this.form.get(inputKey)?.setValue([]);
  }
}
