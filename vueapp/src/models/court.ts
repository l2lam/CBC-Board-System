import { Game } from "./game";

export class Court {
  id?: number;
  name: string;
  position: number;
  game?: Game; // The current game on the court
  reservationMessage: string = "";

  constructor(
    id?: number,
    name: string = "",
    position: number = 0,
    reservationMessage = "",
    game: Game | undefined = undefined
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.reservationMessage = reservationMessage;
    this.game = game;
  }

  get isReserved(): boolean {
    return this.reservationMessage ? true : false;
  }

  assignGame(game: Game) {
    this.game = game;
  }
  removeGame() {
    this.game = undefined;
  }

  toString(): string {
    return this.name;
  }
}
