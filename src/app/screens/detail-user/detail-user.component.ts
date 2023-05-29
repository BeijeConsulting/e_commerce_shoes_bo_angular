import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataApi } from 'src/app/interfaces/UserDataApi';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  user?: UserDataApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorService: NotifyService
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['user']);
    if (!this.route.snapshot.params['user']) {
      this.router.navigate(['cms/users']);
      this.errorService.notify.next('userNotFound');
      return;
    }
    this.user = JSON.parse(this.route.snapshot.params['user']);
    console.log(this.user);
  }
}
