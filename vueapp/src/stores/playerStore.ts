import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { Player, Member } from "../models/player";

const PLAYERS_STORE_ID = "players";
let mock = true;

export const usePlayerStore = defineStore(PLAYERS_STORE_ID, {
  state: () => ({ allPlayers: [] as Player[], allMembers: [] as Member[]}),
  getters: {
    waitingPlayers: (state) => state.allPlayers, // TODO filter only players that are not already in a game
    selectableMembersForWaitingList: (state) => state.allMembers.filter(member => !state.allPlayers.some(player => player.name === member.name))
  },
  actions: {
    async loadPlayers() {
      console.log("loading players");
      if (mock) {
        // Mock data for quick testing
        this.allMembers = [
          new Member(1, "Joe"),
          new Member(2, "Karl"),
          new Member(3, "Mark"),
          new Member(4, "Peter"),
        ];
        this.allPlayers = [
          new Player("Tim"),
          new Player("Tom"),
          new Player("Jane"),
          new Player("Sarah"),
          new Member(5, "Sue"),
          new Member(6, "Shane"),
          new Player("Paul"),
          new Player("Pam"),
          new Player("Pony"),
          new Player("Ron"),
          new Player("Russel"),
          new Player("Ricky"),
          new Player("Roger"),
          new Player("Zebra"),
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
          this.allMembers = data?.map(
            (player) => new Member(player.id, player.name, player.avatar_url)
          );
          // cache this data in local storage
          localStorage.setItem(PLAYERS_STORE_ID, this.allPlayers);
        }
      }
    },
    addPlayer(player:Player) {
      this.allPlayers.push(player);
    },
    removePlayer(player:Player) {
      var index = this.allPlayers.indexOf(player);
      if (index > -1) this.allPlayers.splice(index, 1);
    },
    removeAllPlayers() {
      this.allPlayers = [];
    },
  },
});
