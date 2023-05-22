import { InputBase } from './InputBase';

export class AddProductSizeInput extends InputBase<string> {
  override controlType = 'productSize';

  constructor(options: Object) {
    super(options);
  }
}
