import { InputBase } from './InputBase';

export class SelectInput extends InputBase<string> {
  override controlType = 'select';

  constructor(options: Object) {
    super(options);
  }
}
