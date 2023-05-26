import { Component, ViewChild } from '@angular/core';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DialogLogoutComponent } from 'src/app/components/dialog-logout/dialog-logout.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
})
export class CmsComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

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

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.logout();
    });
  }

  logout(): void {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.storageService.clear();
          this.router.navigate(['login']);
          console.log('Next Token: ', this.authService.token.getValue());
        })
      )
      .subscribe({
        next: (response) => console.log(response),
        error: (err) => console.log(err),
      });
  }
}
