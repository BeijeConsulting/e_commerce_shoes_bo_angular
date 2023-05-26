import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css'],
})
export class DialogLogoutComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogLogoutComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog(confirm: boolean) {
    this.matDialogRef.close(confirm);
  }
}
