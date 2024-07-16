export class Level {
  id: number;
  name: string;
  color: string;
  value: number;

  constructor(id, name, value, color = "#ffffff") {
    this.id = id;
    this.name = name;
    this.color = color;
    this.value = value;
  }
}
