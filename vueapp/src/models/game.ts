import { Challenge } from "./challenge";
import { Player } from "./player";

export class Game {
  id: string; // need this to uniquely identify games
  players: Player[];
  challenge?: Challenge; // The challenge associated with this game

  constructor(players: Player[], challenge: Challenge | undefined = undefined) {
    this.players = players;
    this.challenge = challenge;
    this.id = players.map((player: Player) => player.name).join();
  }

  removePlayer(player: Player) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id === player.id) {
        this.players.splice(i, 1);
        break;
      }
    }
  }
}
