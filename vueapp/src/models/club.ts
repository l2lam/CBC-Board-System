export class Club {
  id?: number;
  name: string;
  description: string;

  constructor(id?: number, name = "", description = "") {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  toString() {
    return this.name;
  }
}
