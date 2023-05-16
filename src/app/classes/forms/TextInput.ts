import { InputBase } from './InputBase';

export class TextInput extends InputBase<string> {
  override controlType = 'text';

  constructor(options: Object) {
    super(options);
  }
}
