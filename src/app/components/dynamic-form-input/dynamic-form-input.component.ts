import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { flatMap, repeat } from 'lodash';
import { MatCardXlImage } from '@angular/material/card';

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

  hide: boolean = true;

  constructor(public dialog: MatDialog) {}

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  // trigger dialog
  openDialog() {
    const dialogRef = this.dialog.open(DialogOrderComponent, {
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result parent', result);
      if (result === undefined) return;

      const newArray: any[] = [];

      result.data.forEach((el: any) => {
        for (let i = 0; i < el.quantity; i++) {
          newArray.push(el.id);
        }
      });
      console.log('newArray', newArray);

      this.form.get('orderId')?.setValue(newArray);
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  selectFiles(event: any, inputKey: string): void {
    console.log('selected file: ', event);
    console.log('inputKey:', inputKey);
    console.log(event.target.files[0]);

    const file = event.target.files[0];

    if (!file) return;

    console.log('filename:', file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
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
