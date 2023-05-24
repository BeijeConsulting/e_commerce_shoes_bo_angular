import { InputBase } from './InputBase';

export class OrderInput extends InputBase<string> {
  override controlType = 'orderinput';
  minNumber: number = 1;

  constructor(options: Object, additionalOptions?: { minNumber: number }) {
    super(options);
    if (additionalOptions) this.minNumber = additionalOptions.minNumber;
  }
}
