import { useClubStore } from "../stores/clubStore";
import { Club } from "./club";
import {
  BoolEditField,
  CrudBase,
  EditFieldBase,
  TextEditField,
  TextFieldType,
} from "./crudBase";

export class ClubsCrud extends CrudBase<Club> {
  nameField = new TextEditField("Name");
  descriptionField = new TextEditField("Description");
  isDefaultField = new BoolEditField("Set as Default");
  constructor() {
    super("Clubs", "mdi-cards-club");
  }

  itemsList(): Club[] {
    const clubStore = useClubStore();
    return clubStore.allClubs;
  }
  getItemEditFields(item: Club): EditFieldBase[] {
    const clubStore = useClubStore();
    this.nameField.value = item?.name;
    this.descriptionField.value = item?.description;
    this.isDefaultField.value = item == clubStore.currentClub;
    return [this.nameField, this.descriptionField, this.isDefaultField];
  }
  removeItem(item: Club) {
    console.log("removing item", item);
  }
  insertItem(item: Club) {
    console.log("inserting item", item);
  }
  updateItem(item: Club) {
    console.log("updating item", item);
  }
}
