export abstract class EditFieldBase {
  label: string;
  hint: string;
  value: any = null;

  constructor(label: string, value: any = null, hint: string = "") {
    this.label = label;
    this.value = value;
    this.hint = hint;
  }
}

export enum TextFieldType {
  TEXT = "text",
  NUMBER = "number",
}

export class TextEditField extends EditFieldBase {
  type: TextFieldType;
  constructor(
    label: string,
    hint: string = "",
    type = TextFieldType.TEXT,
    value = null
  ) {
    super(label, value, hint);
    this.type = type;
  }
}

export class BoolEditField extends EditFieldBase {
  constructor(label: string, hint: string = "", value: boolean = false) {
    super(label, value, hint);
  }
}

export class OptionItem {
  title?: string;
  subtitle?: string;
  value: any;
  constructor(value: any, title?: string, subtitle?: string) {
    this.value = value;
    this.title = title ?? value.toString();
    this.subtitle = subtitle;
  }
}

export class OptionsEditField extends EditFieldBase {
  options: OptionItem[];
  constructor(
    label: string,
    hint: string = "",
    options: OptionItem[] = [],
    value = undefined
  ) {
    super(label, value, hint);
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

  abstract getItemTitle(item: EntityType): string;
  abstract itemsList(): EntityType[];
  abstract getItemEditFields(item): EditFieldBase[];
  abstract removeItem(item: EntityType);
  abstract upsertItem(item?: EntityType);
}
