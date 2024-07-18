import { defineStore } from "pinia";
import { Court } from "../models/court";
import { Player } from "../models/player";
import { Game } from "../models/game";
import { mockLevel3, mockLevel4, mockLevel5 } from "./mockData";
import { supabase, useMockData } from "../supabase";
import { useClubStore } from "./clubStore";

const COURTS_STORE_ID = "courts";

export const useCourtStore = defineStore(COURTS_STORE_ID, {
  state: () => ({ allCourts: [] as Court[] }),
  getters: {
    freeCourts: (state) =>
      state.allCourts.filter((court) => !court.game && !court.isReserved),
  },
  actions: {
    async loadCourts() {
      console.log("loading courts");
      if (useMockData) {
        this.allCourts = [
          new Court(
            1,
            "Court 1",
            false,
            new Game([
              new Player("Wendy", mockLevel3),
              new Player("Winnie", mockLevel3),
              new Player("Wess", mockLevel3),
              new Player("Winston", mockLevel3),
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
              new Player("Dave", mockLevel4),
              new Player("Don", mockLevel4),
              new Player("Dan", mockLevel4),
              new Player("Dick", mockLevel4),
            ])
          ),
          new Court(
            6,
            "Court 6",
            false,
            new Game([
              new Player("Vivian", mockLevel5),
              new Player("Viola", mockLevel5),
              new Player("Violet", mockLevel5),
              new Player("Victor", mockLevel5),
            ])
          ),
          new Court(7, "Court 7"),
          new Court(8, "Court 8"),
          // new Court(9, "Court 9"),
        ];
      } else {
        const clubStore = useClubStore();
        // Get courts from the remote database
        const { data, error, status } = await supabase
          .from("courts")
          .select("id, name")
          .eq("club_id", clubStore.currentClub?.id);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allCourts =
            JSON.parse(localStorage.getItem(COURTS_STORE_ID) || "[]") || [];
        } else {
          this.allCourts = data
            ?.sort((a, b) => {
              return a.name < b.name ? -1 : b.name < a.name ? 1 : 0;
            })
            .map((court) => new Court(court.id, court.name));
          // cache this data in local storage
          localStorage.setItem(COURTS_STORE_ID, JSON.stringify(this.allCourts));
        }
      }
    },
    removeGameFromCourt(court: Court) {
      court.isReserved = false;
      court.game = undefined;
    },
  },
});
