export enum FieldType {
  TEXT,
  NUMBER,
  BOOL,
  OPTION,
}

export class EditField {
  label: string;
  type: FieldType;
  options = [];
  value: any = undefined;

  constructor(label: string, type = FieldType.TEXT, value = undefined) {
    this.label = label;
    this.type = type;
    this.value = value;
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
  abstract getItemEditFields(item): EditField[];
  abstract removeItem(item: EntityType);
  abstract insertItem(item: EntityType);
  abstract updateItem(item: EntityType);
}
