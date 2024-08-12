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
const levelTableName = "levels";

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
          .from(levelTableName)
          .select("id, name, value, rgb_color")
          .eq("club_id", clubStore.currentClub?.id)
          .is("deleted_date", null);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allLevels =
            JSON.parse(localStorage.getItem(LEVELS_STORE_ID) || "[]") || [];
        } else {
          // console.log(data);
          this.allLevels = data
            ?.sort((a, b) => {
              return a.value < b.value ? -1 : b.value < a.value ? 1 : 0;
            })
            .map(
              (level) =>
                new Level(level.id, level.name, level.value, level.rgb_color)
            );
          // cache this data in local storage
          localStorage.setItem(LEVELS_STORE_ID, JSON.stringify(this.allLevels));
        }
      }
    },
    levelById(id) {
      return this.allLevels.find((level) => level.id == id);
    },
    async removeLevel(level: Level) {
      console.log("removing level");
      const { data, error } = await supabase
        .from(levelTableName)
        .update({ deleted_date: new Date() })
        .eq("id", level.id);
      if (error) {
        console.error(error);
        console.log("Failed to delete level");
      }
      this.loadLevels();
    },
    // Save a level record
    async saveLevel(level: Level) {
      const isNewRecord = level.id == undefined;
      console.log("saving level");
      let record: any = {
        name: level.name,
        rgb_color: level.color,
        value: level.value,
      };

      if (isNewRecord) {
        const clubStore = useClubStore();
        record.club_id = clubStore.currentClub?.id;
      }

      const { data, error } = isNewRecord
        ? await supabase.from(levelTableName).insert(record)
        : await supabase.from(levelTableName).update(record).eq("id", level.id);
      if (error) {
        console.error(error);
        console.log("Failed to upsert level");
      }
      this.loadLevels();
    },
  },
});
