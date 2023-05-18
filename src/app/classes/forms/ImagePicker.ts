import { InputBase } from './InputBase';

export class ImagePicker extends InputBase<string> {
  override controlType = 'imagepicker';
  minNumber: number = 1;

  constructor(options: Object, additionalOptions?: { minNumber: number }) {
    super(options);
    if (additionalOptions) this.minNumber = additionalOptions.minNumber;
  }
}
