import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() color: string = '';
  @Input() icon: string = '';
  @Output() onClickEvent = new EventEmitter();

  onClick() {
    this.onClickEvent.emit();
  }
}
