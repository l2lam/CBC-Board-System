import { defineStore } from "pinia";
import { Court } from "../models/court";
import { Player } from "../models/player";
import { Game } from "../models/game";

const COURTS_STORE_ID = "courtsOnDeck";
let mock = true;

export const useCourtStore = defineStore(COURTS_STORE_ID, {
  state: () => ({ allCourts: [] as Court[] }),
  getters: {
    freeCourts: (state) =>
      state.allCourts.filter((court) => !court.game && !court.isReserved),
  },
  actions: {
    async loadCourts() {
      console.log("loading courts");
      if (mock) {
        this.allCourts = [
          new Court(
            1,
            "Court 1",
            false,
            new Game([
              new Player("Wendy"),
              new Player("Winnie"),
              new Player("Wess"),
              new Player("Winston"),
            ])
          ),
          new Court(2, "Court 2"),
          new Court(3, "Court 3"),
          new Court(4, "Court 4"),
          new Court(
            5,
            "Court 5",
            false,
            new Game([
              new Player("Dave"),
              new Player("Don"),
              new Player("Dan"),
              new Player("Dick"),
            ])
          ),
          new Court(
            6,
            "Court 6",
            false,
            new Game([
              new Player("Vivian"),
              new Player("Viola"),
              new Player("Violet"),
              new Player("Victor"),
            ])
          ),
          new Court(7, "Court 7"),
          new Court(8, "Court 8"),
        ];
      } else {
        // TODO load courts from supabase and sort it in desired order
        // Load courts from local storage
        this.allCourts = localStorage.get(COURTS_STORE_ID) || [];
      }
    },
    removeGameFromCourt(court: Court) {
        court.isReserved = false;
        court.game = undefined;
    },
  },
});
