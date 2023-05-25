import { Component, Inject } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>
  ) {}

  denyAction(): void {
    this.matDialogRef.close(false);
  }

  confirmAction(): void {
    this.matDialogRef.close(true);
  }
}
