export class InputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  regexControl?: RegExp;
  options: { key: string; value: string }[];
  readonly: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      regexControl?: RegExp;
      options?: { key: string; value: string }[];
      readonly?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.regexControl = options.regexControl;
    this.options = options.options || [];
    this.readonly = options.readonly ? options.readonly : false;
  }
}
