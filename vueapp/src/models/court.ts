import { Game } from "./game";

export class Court {
  id?: number;
  name: string;
  position: number;
  game?: Game; // The current game on the court
  isReserved: boolean;
  reservationMessage: string = "";

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

  assignGame(game: Game) {
    this.game = game;
  }
  removeGame() {
    this.game = undefined;
  }

  reserve(reason: string) {
    this.isReserved = true;
    this.reservationMessage = reason;
  }
  unReserve() {
    this.isReserved = false;
    this.reservationMessage = "";
  }

  toString(): string {
    return this.name;
  }
}
