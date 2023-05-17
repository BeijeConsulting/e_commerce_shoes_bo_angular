import { InputBase } from './InputBase';

export class PasswordInput extends InputBase<string> {
  override controlType = 'password';

  constructor(options: Object) {
    super(options);
  }
}
