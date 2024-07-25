import { useClubStore } from "../stores/clubStore";
import { Club } from "./club";
import { CrudBase, EditField, FieldType } from "./crudBase";

export class ClubsCrud extends CrudBase<Club> {
  nameField = new EditField("Name");
  descriptionField = new EditField("Name");
  isDefaultField = new EditField("Set as Default", FieldType.BOOL);
  constructor() {
    super("Clubs", "mdi-cards-club");
  }

  itemsList(): Club[] {
    const clubStore = useClubStore();
    return clubStore.allClubs;
  }
  getItemEditFields(item: Club): EditField[] {
    const clubStore = useClubStore();
    this.nameField.value = item.name;
    this.descriptionField.value = item.description;
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
