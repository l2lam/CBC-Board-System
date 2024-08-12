import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Player, Member } from "../models/player";
import { generateMockMembers, generateMockPlayers } from "./mockData";
import { Level } from "../models/level";
import { useClubStore } from "./clubStore";
import { useLevelStore } from "./levelStore";

const PLAYERS_STORE_ID = "players";
const memberTableName = "members";

export const usePlayerStore = defineStore(PLAYERS_STORE_ID, {
  state: () => ({ waitingPlayers: [] as Player[], allMembers: [] as Member[] }),
  getters: {
    selectableMembersForWaitingList: (state) =>
      state.allMembers.filter(
        (member) =>
          member.isActive &&
          !state.waitingPlayers.find(
            (player) =>
              player instanceof Member && (player as Member).id === member.id
          )
      ),
  },
  actions: {
    async loadPlayers() {
      console.log("loading players");
      if (useMockData) {
        // Mock data for quick testing
        var i = 1;
        this.allMembers = generateMockMembers(15);
        var n = this.allMembers.length;
        this.waitingPlayers = this.allMembers
          .slice(4, 8)
          .concat(generateMockPlayers(5, "Guest", n));
      } else {
        const clubStore = useClubStore();
        // Get players from the remote database
        const { data, error, status } = await supabase
          .from(memberTableName)
          .select("id, name, level_id, avatar_url, is_active")
          .eq("club_id", clubStore.currentClub?.id)
          .is("deleted_date", null);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allMembers =
            JSON.parse(localStorage.getItem(PLAYERS_STORE_ID) || "[]") || [];
        } else {
          this.allMembers = data
            ?.sort((a, b) => {
              return a.name < b.name ? -1 : b.name < a.name ? 1 : 0;
            })
            .map(
              (player) =>
                new Member(
                  player.id,
                  player.name,
                  useLevelStore().levelById(player.level_id),
                  player.avatar_url,
                  player.is_active
                )
            );
          // cache this data in local storage
          localStorage.setItem(
            PLAYERS_STORE_ID,
            JSON.stringify(this.waitingPlayers)
          );
        }
      }
    },
    // Add a player to the waiting queue
    addPlayer(player: Player) {
      this.waitingPlayers.push(player);
    },
    // Remove a player from the waiting queue
    removePlayer(player: Player) {
      var index = this.waitingPlayers.indexOf(player);
      if (index > -1) this.waitingPlayers.splice(index, 1);
    },
    // Remove all players from the waiting queue
    removeAllPlayers() {
      this.waitingPlayers = [];
    },
    async changeMemberLevel(member: Member, newLevel: Level) {
      member.level = newLevel;
      if (!useMockData) {
        const { data, error, status } = await supabase
          .from(memberTableName)
          .update({ level_id: newLevel.id })
          .eq("id", member.id);
        if (error && status !== 204) {
          console.log(`Failed to change member (${member.name}'s) level`);
          console.error(error);
        }
      }
    },
    // remove a member record
    async removeMember(member: Member) {
      console.log("removing member");
      const { data, error } = await supabase
        .from(memberTableName)
        .update({ deleted_date: new Date() })
        .eq("id", member.id);
      if (error) {
        console.error(error);
        console.log("Failed to delete member");
      }
      this.loadPlayers();
    },
    // Save a member record
    async saveMember(member: Member) {
      const isNewRecord = member.id == undefined;
      console.log("saving member");
      let record: any = {
        name: member.name,
        is_active: member.isActive,
      };

      if (isNewRecord) {
        const clubStore = useClubStore();
        record.club_id = clubStore.currentClub?.id;
      }
      if (member.level) record.level_id = member.level.id;

      const { data, error } = isNewRecord
        ? await supabase.from(memberTableName).insert(record)
        : await supabase
            .from(memberTableName)
            .update(record)
            .eq("id", member.id);
      if (error) {
        console.error(error);
        console.log("Failed to upsert member");
      }
      this.loadPlayers();
    },
  },
});
