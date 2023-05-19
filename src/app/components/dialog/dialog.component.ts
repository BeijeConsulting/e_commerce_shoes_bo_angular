import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onDelete() {
    alert('delete successfully'); // only for test

    this.closeDialog();
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
