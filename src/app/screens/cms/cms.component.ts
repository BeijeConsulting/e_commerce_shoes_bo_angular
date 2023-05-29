import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { DialogLogoutComponent } from 'src/app/components/dialog-logout/dialog-logout.component';
import { AuthService } from 'src/app/services/auth/auth.service';
// Types
// import Timeout

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css'],
})
export class CmsComponent implements OnInit, OnDestroy {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog
  userRole?: string[];

  isLoading: boolean = false;
  navigationTimeout: ReturnType<typeof setTimeout>;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.userRole = this.authService.userRole;
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      this.navigationHandler(e);
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.navigationTimeout);
  }

  navigationHandler(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.navigationTimeout = setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }

    // Set isLoading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.navigationTimeout = setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
    if (event instanceof NavigationError) {
      this.navigationTimeout = setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

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
    this.authService.logout().subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }
}
