import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Challenge, ChallengeScore, ChallengeState } from "../models/challenge";
import { Member } from "../models/player";
import { Level } from "../models/level";
import { mockChallenge1 } from "./mockData";
import { usePlayerStore } from "./playerStore";
import { useLevelStore } from "./levelStore";

const CHALLENGES_STORE_ID = "challenges";

export const useChallengeStore = defineStore(CHALLENGES_STORE_ID, {
  state: () => ({ activeChallenges: [] as Challenge[] }),
  getters: {},
  actions: {
    async loadChallenges() {
      console.log("loading challenges");
      if (useMockData) {
        // Mock data for quick testing
        this.allChallenges = [mockChallenge1];
      } else {
        // Get active challenges from the local storage
        this.activeChallenges =
          JSON.parse(localStorage.getItem(CHALLENGES_STORE_ID) || "[]") ?? [];
        console.log(this.activeChallenges);
      }
    },
    updateLocalStorage() {
      localStorage.setItem(
        CHALLENGES_STORE_ID,
        JSON.stringify(this.activeChallenges)
      );
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

      // Check if challenge is successful and adjust player levels if appropriate
      if (challenge.state() == ChallengeState.SUCCESSFUL) {
        let playerStore = usePlayerStore();

        // Upgrade the challenger's level
        await playerStore.changeMemberLevel(
          challenge.challenger,
          challenge.targetLevel
        );

        // Check if any incumbent needs to be downgraded
        let failedIncumbent = challenge.incumbentThatIsKnockedDown();
        if (failedIncumbent && failedIncumbent.level) {
          let levelStore = useLevelStore();
          // Get the first level below the incumbent's current level
          let levelsBelow = levelStore.allLevels
            .filter((x) => x.value < failedIncumbent.level.value)
            .sort((a, b) => {
              return a.value < b.value ? 1 : b.value < a.value ? -1 : 0;
            });
          console.log(
            `levels below ${failedIncumbent.level.value}: ${levelsBelow} `
          );
          if (levelsBelow.length > 0) {
            let newLevel = levelsBelow[0];
            await playerStore.changeMemberLevel(failedIncumbent, newLevel);
          } else {
            console.log("Incumbent has no lower level to be demoted to");
          }
        }
      }
    },
  },
});
