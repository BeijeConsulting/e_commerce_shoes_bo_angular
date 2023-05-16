import { InputBase } from './InputBase';

export class DateInput extends InputBase<string> {
  override controlType = 'date';

  constructor(options: Object) {
    super(options);
  }
}
