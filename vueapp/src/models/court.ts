import { Game } from "./game";

export class Court {
  id: number;
  name: string;
  game?: Game; // The current game on the court
  isReserved: boolean;

  constructor(id:number, name:string, isReserved:boolean = false, game:Game|undefined = undefined) {
    this.id = id
    this.name = name
    this.isReserved = isReserved
    this.game = game
  }
}
