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
  clubStore;

  constructor() {
    super("Clubs", "mdi-cards-club");
    this.clubStore = useClubStore();
  }

  getItemStyle(item: Club): string {
    let styles: string[] = [];
    if (item == this.clubStore.currentClub) styles.push("font-weight: bold");
    return styles.join(";");
  }

  itemsList(): Club[] {
    return this.clubStore.allClubs;
  }

  getItemEditFields(item: Club): EditFieldBase[] {
    this.nameField.value = item?.name;
    this.descriptionField.value = item?.description;
    this.isDefaultField.value = item == this.clubStore.currentClub;
    return [this.nameField, this.descriptionField, this.isDefaultField];
  }

  removeItem(item: Club) {
    console.log("removing item", item);
    this.clubStore.removeClub(item);
  }

  upsertItem(item?: Club) {
    console.log("upserting item", item);
    if (!item) item = new Club();
    item.name = this.nameField.value;
    item.description = this.descriptionField.value;
    this.clubStore.saveClub(item);

    if (this.isDefaultField.value) {
      const club = this.clubStore.allClubs.find(
        (club) => club.name == item.name
      );
      if (club) this.clubStore.setCurrentClub(club);
    }
  }
}
