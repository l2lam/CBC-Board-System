import { useCourtStore } from "../stores/courtStore";
import { Court } from "./court";
import {
  CrudBase,
  EditFieldBase,
  TextEditField,
  TextFieldType,
} from "./crudBase";

export class CourtsCrud extends CrudBase<Court> {
  nameField = new TextEditField("Name");
  positionField = new TextEditField(
    "Position",
    "The numerical level value used for determining the order to draw the courts",
    TextFieldType.NUMBER
  );
  courtStore;

  constructor() {
    super("Courts", "mdi-play-circle");
    this.courtStore = useCourtStore();
  }

  getItemTitle(item: Court): string {
    return item.toString();
  }

  itemsList(): Court[] {
    return this.courtStore.allCourts;
  }

  getItemEditFields(item: Court): EditFieldBase[] {
    this.nameField.value = item?.name;
    this.positionField.value = item?.position;
    return [this.nameField, this.positionField];
  }

  removeItem(item: Court) {
    console.log("removing item", item);
    this.courtStore.removeCourt(item);
  }

  upsertItem(item?: Court) {
    console.log("upserting item", item);
    if (!item) item = new Court();
    item.name = this.nameField.value;
    item.position = this.positionField.value;
    this.courtStore.saveCourt(item);
  }
}
