import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { Player, Member } from "../models/player";

const PLAYERS_STORE_ID = "players";
let mock = true;

export const usePlayerStore = defineStore(PLAYERS_STORE_ID, {
  state: () => ({ waitingPlayers: [] as Player[], allMembers: [] as Member[]}),
  getters: {
    selectableMembersForWaitingList: (state) => state.allMembers.filter(member => !state.waitingPlayers.find(player => player.name === member.name)) // TODO: match on id instead of name... move `id` property from `Member` to `Player` class and devise a way to assign a unique id to guests.  Members should already have unique ids
  },
  actions: {
    async loadPlayers() {
      console.log("loading players");
      if (mock) {
        // Mock data for quick testing
        var i = 1
        this.allMembers = Member.generateMockMembers(15)
        var n = this.allMembers.length
        this.waitingPlayers = this.allMembers.slice(4, 8)
          .concat(Player.generateMockPlayers(5, "Guest", n))
      } else {
        // Get players from the remote database
        const { data, error, status } = await supabase
          .from("members")
          .select("id, name, avatar_url");

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allMembers = localStorage.get(PLAYERS_STORE_ID) || [];
        } else {
          this.allMembers = data?.map(
            (player) => new Member(player.id, player.name, player.avatar_url)
          );
          // cache this data in local storage
          localStorage.setItem(PLAYERS_STORE_ID, this.waitingPlayers);
        }
      }
    },
    addPlayer(player:Player) {
      this.waitingPlayers.push(player);
    },
    removePlayer(player:Player) {
      var index = this.waitingPlayers.indexOf(player);
      if (index > -1) this.waitingPlayers.splice(index, 1);
    },
    removeAllPlayers() {
      this.waitingPlayers = [];
    },
  },
});
