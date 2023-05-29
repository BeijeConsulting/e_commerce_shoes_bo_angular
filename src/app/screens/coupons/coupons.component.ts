import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// Router
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
})
export class CouponsComponent implements OnInit {
  constructor(
    private router: Router,
    private translatePipe: TranslatePipe,
    private errorService: NotifyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.errorService.notify.subscribe((err) => {
      if (err) {
        this.notifyCouponNotFound(err);
        this.errorService.notify.next('');
      }
    });
  }

  notifyCouponNotFound(err: string) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: 'snackbar-error',
    };
    return this.snackBar.open(
      this.translatePipe.transform(err),
      '',
      snackBarConfig
    );
  }

  addCoupon() {
    this.router.navigate(['cms/coupons/add-coupon']);
  }
}
