import { defineStore } from "pinia";
import { Game } from "../models/game";
import { Player } from "../models/player";
import { usePlayerStore } from "../stores/playerStore";

const GAMES_ON_DECK_STORE_ID = "gamesOnDeck";
let mock = true;

export const useGameStore = defineStore(GAMES_ON_DECK_STORE_ID, {
  state: () => ({ gamesOnDeck: [] as Game[] }),
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
    // Remove the game at the given index and return all players in the game to the waiting queue
    removeFromOnDeck(game: Game) {
      var index = this.gamesOnDeck.indexOf(game)
      if (index > -1) {
        var playerStore = usePlayerStore();
        game.players.forEach(player => {
          playerStore.addPlayer(player)
        });
        this.gamesOnDeck.splice(index, 1);
      }
    },
    addGameToOnDeckQueue(game: Game) {
      this.gamesOnDeck.push(game);
    },
  },
});
