import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Club } from "../models/club";
import { mockClub } from "./mockData";
import { useLevelStore } from "./levelStore";
import { useGameStore } from "./gameStore";
import { useCourtStore } from "./courtStore";
import { usePlayerStore } from "./playerStore";
import { useChallengeStore } from "./challengeStore";

const CLUBS_STORE_ID = "clubs";
const CURRENT_CLUB_ID = "current club id";
const clubsTableName = "clubs";

export const useClubStore = defineStore(CLUBS_STORE_ID, {
  state: () => ({
    allClubs: [] as Club[],
    currentClub: undefined as Club | undefined,
  }),
  getters: {},
  actions: {
    async loadClubs() {
      console.log("loading clubs");
      if (useMockData) {
        this.allClubs = [mockClub];
      } else {
        // Get data from the remote database
        const { data, error, status } = await supabase
          .from(clubsTableName)
          .select("id, name, description")
          .is("deleted_date", null);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allClubs =
            JSON.parse(localStorage.getItem(CLUBS_STORE_ID) || "[]") || [];
        } else {
          this.serializeClubData(data);

          // If there are no clubs for the user then create default club for them
          if (!data || data?.length == 0) {
            console.log("No clubs found, creating default club");
            this.createDefaultClub();
          }

          // cache this data in local storage
          localStorage.setItem(CLUBS_STORE_ID, JSON.stringify(this.allClubs));
        }
      }
      this.setCurrentClub();

      const levelStore = useLevelStore();
      await levelStore.loadLevels();
      const gameStore = useGameStore();
      await gameStore.loadGames();
      const courtStore = useCourtStore();
      await courtStore.loadCourts();
      const playerStore = usePlayerStore();
      await playerStore.loadPlayers();
      const challengeStore = useChallengeStore();
      await challengeStore.loadChallenges();
    },
    // Get the current club based on the cached id, or the first club if the id is not cached.
    setCurrentClub(club?: Club) {
      if (club) {
        this.currentClub = club;
        localStorage.setItem(CURRENT_CLUB_ID, `${club.id}`);
      } else {
        let currentClubId = parseInt(
          localStorage.getItem(CURRENT_CLUB_ID) || "0"
        );
        let clubs = this.allClubs.filter((x) => x.id == currentClubId);
        if (clubs.length > 0) this.currentClub = clubs[0];
        else if (this.allClubs.length > 0) {
          this.setCurrentClub(this.allClubs[0]);
        } else console.log("There are no clubs defined");
      }
    },
    // Convert the raw club data into our stored models
    serializeClubData(data) {
      console.log(data);
      this.allClubs = data?.map(
        (club) => new Club(club.id, club.name, club.description)
      );
    },
    async getUserId() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user?.id;
    },
    // Create a default club for the user
    async createDefaultClub() {
      const userId = await this.getUserId();
      if (userId) {
        const { data, error } = await supabase
          .from(clubsTableName)
          .insert({ name: "Default Club Name", profile_id: userId })
          .select();
        if (error) {
          console.error(error);
          console.log("Failed to create default club");
        } else {
          this.serializeClubData(data);
        }
      } else {
        console.error("Cannot retrieve user information from supabase");
      }
    },
    // Remove a club
    async removeClub(club: Club) {
      if (this.allClubs.length > 1) {
        console.log("removing club");
        const { data, error } = await supabase
          .from(clubsTableName)
          .update({ deleted_date: new Date() })
          .eq("id", club.id);
        if (error) {
          console.error(error);
          console.log("Failed to delete club");
        }
        this.loadClubs();
      } else {
        console.log(
          "Cannot remove club; an account must have at least one club"
        );
      }
    },
    // Save a club record
    async saveClub(club: Club) {
      const isNewRecord = club.id == undefined;
      console.log("saving club");
      let record: any = {
        name: club.name,
        description: club.description,
      };

      if (isNewRecord) {
        const userId = await this.getUserId();
        record.profile_id = userId;
      }

      const { data, error } = isNewRecord
        ? await supabase.from(clubsTableName).insert(record)
        : await supabase.from(clubsTableName).update(record).eq("id", club.id);
      if (error) {
        console.error(error);
        console.log("Failed to upsert club");
      }
      this.loadClubs();
    },
  },
});
