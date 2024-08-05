export abstract class EditFieldBase {
  label: string;
  value: any = null;

  constructor(label: string, value) {
    this.label = label;
    this.value = value;
  }
}

export enum TextFieldType {
  TEXT = "text",
  NUMBER = "number",
}

export class TextEditField extends EditFieldBase {
  type: TextFieldType;
  constructor(label: string, type = TextFieldType.TEXT, value = null) {
    super(label, value);
    this.type = type;
  }
}

export class BoolEditField extends EditFieldBase {
  constructor(label: string, value: boolean = false) {
    super(label, value);
  }
}

export class OptionItem {
  title: string;
  subtitle: string;
  value: any;
  constructor(value: any, title: string, subtitle: string) {
    this.value = value;
    this.title = title;
    this.subtitle = subtitle;
  }
}

export class OptionsEditField extends EditFieldBase {
  options: OptionItem[];
  constructor(label: string, options: OptionItem[], value = undefined) {
    super(label, value);
    this.options = options;
  }
}

export abstract class CrudBase<EntityType> {
  icon: string;
  title: string;

  constructor(title: string, icon: string) {
    this.title = title;
    this.icon = icon;
  }

  abstract itemsList(): EntityType[];
  abstract getItemEditFields(item): EditFieldBase[];
  abstract removeItem(item: EntityType);
  abstract insertItem(item: EntityType);
  abstract updateItem(item: EntityType);
}
