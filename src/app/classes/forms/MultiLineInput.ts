import { InputBase } from './InputBase';

export class MultiLine extends InputBase<string> {
  override controlType = 'multiline';

  constructor(options: Object) {
    super(options);
  }
}
