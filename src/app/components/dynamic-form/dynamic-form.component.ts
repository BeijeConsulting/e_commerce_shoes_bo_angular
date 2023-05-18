import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormControlService } from 'src/app/services/form/form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [FormControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() inputs: InputBase<string>[] | null = [];
  @Input() submitButtonLabel: string = 'Submit';
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  constructor(private qcs: FormControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputs as InputBase<string>[]);
  }

  onSubmit() {
    // console.log('form: ', this.form);
    this.submitEvent.emit(this.form.getRawValue());
  }
}
