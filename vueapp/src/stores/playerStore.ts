import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { Player, Member } from "../models/player";

const PLAYERS_STORE_ID = "players";
let mock = true;

export const usePlayerStore = defineStore(PLAYERS_STORE_ID, {
  state: () => ({ allPlayers: [] }),
  getters: {
    waitingPlayers: (state) => state.allPlayers,
  },
  actions: {
    async loadPlayers() {
      console.log("loading players");
      if (mock) {
        this.allPlayers = [
          new Player("Tim"),
          new Player("Tom"),
          new Player("Jane"),
          new Member(1, "Joe"),
          new Member(2, "Karl"),
          new Player("Sarah"),
        ];
      } else {
        // Get players from the remote database
        const { data, error, status } = await supabase
          .from("members")
          .select("id, name, avatar_url");

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allPlayers = localStorage.get(PLAYERS_STORE_ID) || [];
        } else {
          console.log(data);
          this.allPlayers = data?.map(
            (player) => new Member(player.id, player.name, player.avatar_url)
          );
          // cache this data in local storate
          localStorage.setItem(PLAYERS_STORE_ID, this.allPlayers);
        }
      }
    },
    addPlayer(player) {
      // console.log("adding new player to the queue:", player);
      this.allPlayers.push(player);
    },
  },
});
