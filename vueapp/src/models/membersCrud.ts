import { useLevelStore } from "../stores/levelStore";
import { usePlayerStore } from "../stores/playerStore";
import {
  BoolEditField,
  CrudBase,
  EditFieldBase,
  OptionItem,
  OptionsEditField,
  TextEditField,
  TextFieldType,
} from "./crudBase";
import { Member } from "./player";

export class MembersCrud extends CrudBase<Member> {
  nameField = new TextEditField("Name", "", TextFieldType.TEXT, null, true);
  levelField: OptionsEditField;
  isActiveField = new BoolEditField(
    "Is Active",
    "Whether or not the person is considered an active member",
    true
  );
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

  getItemStyle(item: Member): string {
    let styles: string[] = [];
    if (item.level) styles.push(`color: ${item.level.color}`);
    if (!item.isActive) styles.push("text-decoration: line-through");
    return styles.join(";");
  }

  itemsList(): Member[] {
    return this.playerStore.allMembers;
  }

  getItemEditFields(item: Member): EditFieldBase[] {
    this.nameField.value = item?.name;
    this.levelField.value = item?.level;
    if (item) this.isActiveField.value = item.isActive;
    return [this.nameField, this.levelField, this.isActiveField];
  }

  removeItem(item: Member) {
    // console.log("removing item", item);
    this.playerStore.removeMember(item);
  }

  upsertItem(item?: Member) {
    // console.log("upserting item", item);
    if (!item) {
      item = new Member();
    }
    item.name = this.nameField.value;
    item.level = this.levelField.value;
    item.isActive = this.isActiveField.value;
    this.playerStore.saveMember(item);
  }
}
