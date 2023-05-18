import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-logout',
  templateUrl: './dialog-logout.component.html',
  styleUrls: ['./dialog-logout.component.css'],
})
export class DialogLogoutComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogLogoutComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onLogout() {
    alert('logout successfully'); // only for test
    this.closeDialog();
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
