import { Game } from "./game";

export class Court {
  id: number;
  name: string;
  sequence: number; // The order to draw the court on the screen
  game: Game; // The current game on the court
}
