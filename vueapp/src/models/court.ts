import { Game } from "./game";

export class Court {
  id?: number;
  name: string;
  position: number;
  game?: Game; // The current game on the court
  isReserved: boolean;

  constructor(
    id?: number,
    name: string = "",
    position: number = 0,
    isReserved: boolean = false,
    game: Game | undefined = undefined
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.isReserved = isReserved;
    this.game = game;
  }

  toString(): string {
    return this.name;
  }
}
