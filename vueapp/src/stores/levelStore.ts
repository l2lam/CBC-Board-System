import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Level } from "../models/level";
import {
  mockLevel1,
  mockLevel2,
  mockLevel3,
  mockLevel4,
  mockLevel5,
} from "./mockData";
import { useClubStore } from "./clubStore";

const LEVELS_STORE_ID = "levels";

export const useLevelStore = defineStore(LEVELS_STORE_ID, {
  state: () => ({ allLevels: [] as Level[] }),
  getters: {},
  actions: {
    async loadLevels() {
      console.log("loading levels");
      if (useMockData) {
        this.allLevels = [
          mockLevel1,
          mockLevel2,
          mockLevel3,
          mockLevel4,
          mockLevel5,
        ];
      } else {
        const clubStore = useClubStore();
        // Get data from the remote database
        const { data, error, status } = await supabase
          .from("levels")
          .select("id, name, value, rgb_color")
          .eq("club_id", clubStore.currentClub?.id);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allLevels = localStorage.getItem(LEVELS_STORE_ID) || [];
        } else {
          console.log(data);
          this.allLevels = data?.map(
            (level) =>
              new Level(level.id, level.name, level.value, level.rgb_color)
          );
          // cache this data in local storage
          localStorage.setItem(LEVELS_STORE_ID, this.allLevels);
        }
      }
    },
    levelById(id) {
      return this.allLevels.find((level) => level.id == id);
    },
  },
});
