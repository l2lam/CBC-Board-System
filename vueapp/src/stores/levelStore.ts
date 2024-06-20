import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { Level } from "../models/level";
import {
  mockLevel1,
  mockLevel2,
  mockLevel3,
  mockLevel4,
  mockLevel5,
} from "./mockData";

const LEVELS_STORE_ID = "levels";
let mock = true;

export const useLevelStore = defineStore(LEVELS_STORE_ID, {
  state: () => ({ allLevels: [] as Level[] }),
  getters: {},
  actions: {
    async loadLevels() {
      console.log("loading levels");
      if (mock) {
        this.allLevels = [
          mockLevel1,
          mockLevel2,
          mockLevel3,
          mockLevel4,
          mockLevel5,
        ];
      } else {
        // Get data from the remote database
        const { data, error, status } = await supabase
          .from("levels")
          .select("id, name");

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allLevels = localStorage.get(LEVELS_STORE_ID) || [];
        } else {
          console.log(data);
          this.allLevels = data?.map(
            (level) => new Level(level.id, level.name)
          );
          // cache this data in local storate
          localStorage.setItem(LEVELS_STORE_ID, this.allLevels);
        }
      }
    },
    levelById(id) {
      return this.allLevels.find((level) => level.id == id);
    },
  },
});
