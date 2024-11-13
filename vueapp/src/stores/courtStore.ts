import { defineStore } from "pinia";
import { Court } from "../models/court";
import { Player } from "../models/player";
import { Game } from "../models/game";
import { mockLevel3, mockLevel4, mockLevel5 } from "./mockData";
import { supabase, useMockData } from "../supabase";
import { useClubStore } from "./clubStore";

const COURTS_STORE_ID = "courts";
const courtTableName = "courts";

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
            1,
            false,
            new Game([
              new Player("Wendy", mockLevel3),
              new Player("Winnie", mockLevel3),
              new Player("Wess", mockLevel3),
              new Player("Winston", mockLevel3),
            ])
          ),
          new Court(2, "Court 2", 2),
          new Court(3, "Court 3", 3),
          new Court(4, "Court 4", 4),
          new Court(
            5,
            "Court 5",
            5,
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
            6,
            false,
            new Game([
              new Player("Vivian", mockLevel5),
              new Player("Viola", mockLevel5),
              new Player("Violet", mockLevel5),
              new Player("Victor", mockLevel5),
            ])
          ),
          new Court(7, "Court 7", 7),
          new Court(8, "Court 8", 8),
          // new Court(9, "Court 9", 9),
        ];
      } else {
        const clubStore = useClubStore();
        // Get courts from the remote database
        const { data, error, status } = await supabase
          .from(courtTableName)
          .select("id, name, position")
          .eq("club_id", clubStore.currentClub?.id)
          .is("deleted_date", null);

        if (error && status !== 406) {
          console.error(error);
          // Fall back to data from local storage
          this.allCourts =
            JSON.parse(localStorage.getItem(COURTS_STORE_ID) || "[]") || [];
        } else {
          this.allCourts = data
            ?.sort((a, b) => {
              return a.position < b.position
                ? -1
                : b.position < a.position
                ? 1
                : 0;
            })
            .map((court) => new Court(court.id, court.name, court.position));
          // cache this data in local storage
          localStorage.setItem(COURTS_STORE_ID, JSON.stringify(this.allCourts));
        }
      }
    },
    assignGameToCourt(court: Court, game: Game) {
      // Make sure the game doesn't already exists on another court
      if (this.allCourts.some((c) => c.game?.id == game.id)) return false;
      court.assignGame(game);
      return true;
    },
    removeGameFromCourt(court: Court) {
      court.removeGame();
    },
    async removeCourt(court: Court) {
      console.log("removing level");
      const { data, error } = await supabase
        .from(courtTableName)
        .update({ deleted_date: new Date() })
        .eq("id", court.id);
      if (error) {
        console.error(error);
        console.log("Failed to delete court");
      }
      this.loadCourts();
    },
    // Save a court record
    async saveCourt(court: Court) {
      const isNewRecord = court.id == undefined;
      console.log("saving court");
      let record: any = {
        name: court.name,
        position: court.position,
      };

      if (isNewRecord) {
        const clubStore = useClubStore();
        record.club_id = clubStore.currentClub?.id;
      }

      const { data, error } = isNewRecord
        ? await supabase.from(courtTableName).insert(record)
        : await supabase.from(courtTableName).update(record).eq("id", court.id);
      if (error) {
        console.error(error);
        console.log("Failed to upsert court");
      }
      this.loadCourts();
    },
  },
});
