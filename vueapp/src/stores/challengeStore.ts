import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { Challenge, ChallengeScore } from "../models/challenge";
import { Member } from "../models/player";
import { Level } from "../models/level";
import { mockChallenge1 } from "./mockData";

const CHALLENGES_STORE_ID = "challenges";
let mock = true;

export const useChallengeStore = defineStore(CHALLENGES_STORE_ID, {
  state: () => ({ activeChallenges: [] as Challenge[] }),
  getters: {},
  actions: {
    async loadChallenges() {
      console.log("loading challenges");
      if (mock) {
        // Mock data for quick testing
        this.allChallenges = [mockChallenge1];
      } else {
        // Get active challenges from the local storage
        this.activeChallenges = localStorage.getItem(CHALLENGES_STORE_ID) ?? [];
      }
    },
    updateLocalStorage() {
      localStorage.setItem(CHALLENGES_STORE_ID, this.activeChallenges);
    },
    async registerNewChallenge(
      challenger: Member,
      targetLevel: Level,
      incumbents: Member[]
    ): Promise<Challenge> {
      // TODO: persist to supabase
      //const {data, error} = await supabase.rpc('register_challenge', ...)
      var challenge = new Challenge({
        id: challenger.id + this.activeChallenges.length,
        date: new Date(),
        challenger,
        targetLevel,
        incumbents,
        scores: [],
      });

      this.activeChallenges.push(challenge);
      this.updateLocalStorage();
      return challenge;
    },
    async registerScore(
      challenge: Challenge,
      winners: Member[],
      losers: Member[],
      score: string
    ) {
      var newScore = new ChallengeScore({
        date: new Date(),
        score,
        winners,
        losers,
      });
      challenge.registerScore(newScore);
      this.updateLocalStorage();
    },
  },
});
