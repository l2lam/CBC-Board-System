import { defineStore } from "pinia";
import { Game } from "../models/game";
import { Player } from "../models/player";

const GAMES_ON_DECK_STORE_ID = "gamesOnDeck";
let mock = true;

export const useGameStore = defineStore(GAMES_ON_DECK_STORE_ID, {
  state: () => ({ gamesOnDeck: [] }),
  getters: {},
  actions: {
    async loadGames() {
      console.log("loading games");
      if (mock) {
        this.gamesOnDeck = [
          new Game([new Player("Mike"), new Player("Moe")]),
          new Game([
            new Player("Nick"),
            new Player("Nancy"),
            new Player("Nelly"),
            new Player("Nathan"),
          ]),
          new Game([new Player("Larry"), new Player("Lisa")]),
        ];
      } else {
        // Load games from local storage
        this.gamesOnDeck = localStorage.get(GAMES_ON_DECK_STORE_ID) || [];
      }
    },
    removeGameAt(index) {
      if (index > -1) this.gamesOnDeck.splice(index, 1);
      console.log("remove at " + index, this.gamesOnDeck);
    },
  },
});
