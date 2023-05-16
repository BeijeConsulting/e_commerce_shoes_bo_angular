import { InputBase } from './InputBase';

export class CheckboxInput extends InputBase<string> {
  override controlType = 'checkbox';

  constructor(options: Object) {
    super(options);
  }
}
