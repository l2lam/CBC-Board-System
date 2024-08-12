export class Level {
  id?: number;
  name: string;
  color: string;
  value: number;

  constructor(
    id?: number,
    name: string = "",
    value: number = 0,
    color = "#ffffff"
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.value = value;
  }

  toString(): string {
    return `${this.value} ${this.name}`;
  }
}
