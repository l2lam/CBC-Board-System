import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Club } from "../models/club";
import { mockClub } from "./mockData";

const CLUBS_STORE_ID = "clubs";

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
          .from("clubs")
          .select("id, name, description");

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allClubs = localStorage.getItem(CLUBS_STORE_ID) || [];
        } else {
          this.serializeClubData(data);

          // If there are no clubs for the user then create default club for them
          if (!data || data?.length == 0) {
            console.log("No clubs found, creating default club");
            this.createDefaultClub();
          }

          // cache this data in local storage
          localStorage.setItem(CLUBS_STORE_ID, this.allClubs);
        }
      }
      this.setCurrentClub();
    },
    // Get the current club based on the cached id, or the first club if the id is not cached.
    setCurrentClub() {
      let currentClubId = localStorage.getItem("current club id") || 0;
      let clubs = this.allClubs.filter((x) => x.id == currentClubId);
      if (clubs.length > 0) this.currentClub = clubs[0];
      else if (this.allClubs.length > 0) this.currentClub = this.allClubs[0];
      if (!this.currentClub) console.log("There are no clubs defined");
    },
    // Convert the raw club data into our stored models
    serializeClubData(data) {
      console.log(data);
      this.allClubs = data?.map(
        (club) => new Club(club.id, club.name, club.description)
      );
    },
    // Create a default club for the user
    async createDefaultClub() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) {
        const { data, error } = await supabase
          .from("clubs")
          .insert({ name: "Default Club Name", profile_id: user.id })
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
  },
});
