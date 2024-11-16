import { defineStore } from "pinia";
import { supabase, useMockData } from "../supabase";
import { Challenge, ChallengeScore, ChallengeState } from "../models/challenge";
import { Member } from "../models/player";
import { Level } from "../models/level";
import { mockChallenge1 } from "./mockData";
import { usePlayerStore } from "./playerStore";
import { useLevelStore } from "./levelStore";
import { useClubStore } from "./clubStore";

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
        var clubStore = useClubStore();
        var cachedChallenges = (
          JSON.parse(localStorage.getItem(CHALLENGES_STORE_ID) || "[]") ?? []
        ).filter((c) => c.clubId == clubStore?.currentClub?.id);
        cachedChallenges.forEach(
          (c) => (c.scores = c.scores.map((s) => new ChallengeScore(s)))
        );

        // console.log(cachedChallenges);

        this.activeChallenges = cachedChallenges.map((c) => new Challenge(c));
        // console.log(this.activeChallenges);
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
      var clubStore = useClubStore();
      var challenge = new Challenge({
        id: challenger.id + this.activeChallenges.length,
        clubId: clubStore.currentClub?.id,
        date: new Date(),
        challenger,
        targetLevel,
        incumbents,
        scores: [],
      });

      this.activeChallenges.unshift(challenge);
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

        // Remove the challenge from the list of active challenges
        this.removeChallenge(challenge);
      }
      this.updateLocalStorage();
    },
    removeChallenge(challenge: Challenge) {
      var index = this.activeChallenges.indexOf(challenge);
      if (index > -1) this.activeChallenges.splice(index, 1);
    },
  },
});
