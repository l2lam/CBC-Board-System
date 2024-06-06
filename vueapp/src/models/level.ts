export class Level {
  id: number;
  name: string;
  color: string;

  constructor(id, name, color = "ffffff") {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
