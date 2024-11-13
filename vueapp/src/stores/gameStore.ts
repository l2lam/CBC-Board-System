import { defineStore } from "pinia";
import { Game } from "../models/game";
import { Player } from "../models/player";
import { usePlayerStore } from "../stores/playerStore";
import { useCourtStore } from "./courtStore";
import { mockChallengeGame1, mockLevel2, mockLevel3 } from "./mockData";
import { useMockData } from "../supabase";

const GAMES_ON_DECK_STORE_ID = "gamesOnDeck";

export class DraggedGame {
  gameId: string;
  courtId: number | undefined;
  constructor(gameId: string, courtId: number | undefined) {
    this.gameId = gameId;
    this.courtId = courtId;
  }
}

export const useGameStore = defineStore(GAMES_ON_DECK_STORE_ID, {
  state: () => ({
    gamesOnDeck: [] as Game[],
    draggedGame: undefined as DraggedGame | undefined,
  }),
  getters: {},
  actions: {
    async loadGames() {
      console.log("loading games");
      if (useMockData) {
        this.gamesOnDeck = [
          new Game([
            new Player("Mike", mockLevel2),
            new Player("Moe", mockLevel2),
          ]),
          new Game([
            new Player("Nick", mockLevel3),
            new Player("Nancy", mockLevel3),
            new Player("Nelly", mockLevel3),
            new Player("Nathan", mockLevel3),
          ]),
          mockChallengeGame1,
        ];
      } else {
        // Load games from local storage
        this.gamesOnDeck =
          JSON.parse(localStorage.getItem(GAMES_ON_DECK_STORE_ID) || "[]") ||
          [];
      }
    },
    // Remove the game at the given index and return all players in the game to the waiting queue
    removeFromOnDeck(game: Game, sendPlayerBackToWaitingQueue: boolean = true) {
      var index = this.gamesOnDeck.indexOf(game);
      if (index > -1) {
        if (sendPlayerBackToWaitingQueue) {
          var playerStore = usePlayerStore();
          game.players.forEach((player) => {
            playerStore.addPlayer(player);
          });
        }
        this.gamesOnDeck.splice(index, 1);
      }
    },
    addGameToOnDeckQueue(game: Game) {
      this.gamesOnDeck.push(game);
      game.players.forEach((player) => usePlayerStore().removePlayer(player));
    },
    // Search for the game with the given id and return it if found, otherwise return undefined.
    findGameById(id: string): Game | undefined {
      var game = this.gamesOnDeck.find((game) => game.id == id);
      if (!game) {
        // Search the courts for the game
        var courtStore = useCourtStore();
        game = courtStore.allCourts.find(
          (court) => court.game?.id === id
        )?.game;
      }
      return game;
    },
  },
});
