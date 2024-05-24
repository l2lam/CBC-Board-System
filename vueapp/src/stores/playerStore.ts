import { defineStore } from "pinia";
import { supabase } from "../supabase";

class Player {
  name: string;
  avatar_url: string;
  isGuest: boolean = false;
  challengeId: number;

  constructor(name, avatar_url = null) {
    this.name = name;
    this.avatar_url = avatar_url;
  }
}

const PLAYERS_STORE_ID = "players";
let mock = false;

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
          new Player("Sarah"),
        ];
      } else {
        // Get players from the remote database
        // TODO: queries will not work until RSL (row-level-security) prolicies have been defined in supabase
        // console.log("supabase url", await supabase.auth.getUser());
        const { data, error, status } = await supabase.from("players").select();
        // .select(`name, avatar_url`);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allPlayers = localStorage.get(PLAYERS_STORE_ID) || [];
        } else {
          console.log(data);
          this.allPlayers = data?.map(
            (player) => new Player(player.name, player.avatar_url)
          );
          // cache this data in local storate
          localStorage.setItem(PLAYERS_STORE_ID, this.allPlayers);
        }
      }
    },
    // increment() {
    //   this.count++;
    // },
  },
});
