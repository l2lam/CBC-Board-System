import { useLevelStore } from "../stores/levelStore";
import { usePlayerStore } from "../stores/playerStore";
import {
  CrudBase,
  EditFieldBase,
  OptionItem,
  OptionsEditField,
  TextEditField,
} from "./crudBase";
import { Member } from "./player";

export class MembersCrud extends CrudBase<Member> {
  nameField = new TextEditField("Name");
  levelField: OptionsEditField;
  playerStore;

  constructor() {
    super("Members", "mdi-account-circle");
    this.playerStore = usePlayerStore();
    const levelStore = useLevelStore();
    this.levelField = new OptionsEditField(
      "Level",
      "The skill level",
      levelStore.allLevels.map((level) => new OptionItem(level))
    );
  }

  getItemTitle(item: Member): string {
    return item.toString();
  }

  itemsList(): Member[] {
    return this.playerStore.allMembers;
  }

  getItemEditFields(item: Member): EditFieldBase[] {
    this.nameField.value = item?.name;
    this.levelField.value = item?.level;
    return [this.nameField, this.levelField];
  }

  removeItem(item: Member) {
    console.log("removing item", item);
    this.playerStore.removeMember(item);
  }

  upsertItem(item?: Member) {
    console.log("upserting item", item);
    if (!item) item = new Member();
    item.name = this.nameField.value;
    item.level = this.levelField.value;
    this.playerStore.saveMember(item);
  }
}
