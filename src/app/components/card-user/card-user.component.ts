import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css'],
})
export class CardUserComponent {
  @Input() id: string | number = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() address1: string = '';
  @Input() address2: string = '';
  @Input() lastName: string = '';
  @Input() name: string = '';
  @Input() birthDate: string = '';
}
