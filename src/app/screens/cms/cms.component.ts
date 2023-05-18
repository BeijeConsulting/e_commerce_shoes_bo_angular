import { Component, ViewChild } from '@angular/core';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { DialogLogoutComponent } from 'src/app/components/dialog-logout/dialog-logout.component';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
})
export class CmsComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(public dialog: MatDialog) {}

  // trigger dialog
  openDialog() {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      restoreFocus: false,
      data: {
        logout: 'Are you sure you want log out?',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
