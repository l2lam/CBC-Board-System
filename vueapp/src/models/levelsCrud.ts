import { useLevelStore } from "../stores/levelStore";
import {
  CrudBase,
  EditFieldBase,
  TextEditField,
  TextFieldType,
} from "./crudBase";
import { Level } from "./level";

export class LevelsCrud extends CrudBase<Level> {
  nameField = new TextEditField("Name");
  colorField = new TextEditField(
    "Color",
    "RGB color like #ffffff for white, #000000 for black, etc."
  );
  levelValueField = new TextEditField(
    "Level",
    "The numerical level value (higher means more skilled)",
    TextFieldType.NUMBER
  );
  levelStore;

  constructor() {
    super("Levels", "mdi-stairs-up");
    this.levelStore = useLevelStore();
  }

  getItemTitle(item: Level): string {
    return item.toString();
  }

  itemsList(): Level[] {
    return this.levelStore.allLevels;
  }

  getItemEditFields(item: Level): EditFieldBase[] {
    this.nameField.value = item?.name;
    this.colorField.value = item?.color;
    this.levelValueField.value = item?.value;
    return [this.nameField, this.colorField, this.levelValueField];
  }

  removeItem(item: Level) {
    console.log("removing item", item);
    this.levelStore.removeLevel(item);
  }

  upsertItem(item?: Level) {
    console.log("upserting item", item);
    if (!item) item = new Level();
    item.name = this.nameField.value;
    item.color = this.colorField.value;
    item.value = this.levelValueField.value;
    this.levelStore.saveLevel(item);
  }
}
