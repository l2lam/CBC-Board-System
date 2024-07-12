<template>
  <QueueColumn>
    <template v-slot:main>
      <v-card :title="member.name" class="mx-auto" width="90%">
        <template v-slot:prepend>
          <PlayerAvatar :player="member" />
        </template>
        <div v-if="currentScreen == Screen.CHALLENGE">
          <!-- <v-card-subtitle>Initiate a Challenge</v-card-subtitle> -->
          <v-card-text>Initiate a Challenge</v-card-text>
          <v-select
            label="Target level"
            :items="levelStore.allLevels.filter((level) => level != member?.level)"
            item-title="name"
            v-model="targetLevel"
            return-object
          >
          </v-select>
          <div v-if="targetLevel">
            <v-card-text>Select players for the challenge</v-card-text>
            <v-list>
              <Player
                :player="incumbent"
                v-for="incumbent in incumbents"
                :key="incumbent.name"
              >
                <template v-slot:append>
                  <v-checkbox-btn
                    v-model="selectedIncumbents"
                    :value="incumbent"
                  ></v-checkbox-btn>
                </template>
              </Player>
            </v-list>
          </div>
        </div>
      </v-card>
    </template>
    <template v-slot:actions>
      <div v-if="currentScreen == Screen.CHALLENGE">
        <v-btn
          prepend-icon="mdi-cancel"
          :stacked="true"
          @click="currentScreen = Screen.MAIN"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="targetLevel && selectedIncumbents.length > 0"
          prepend-icon="mdi-one-up"
          stacked
          @click="createChallenge"
        >
          Go
        </v-btn>
      </div>
      <div v-else-if="currentScreen == Screen.MAIN">
        <v-btn
          prepend-icon="mdi-one-up"
          text="Initiate challenge"
          stacked
          @click="goToChallengeSetUp"
        ></v-btn>
        <v-btn prepend-icon="mdi-check" stacked @click="done"> Done </v-btn>
      </div>
    </template>
  </QueueColumn>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useLevelStore } from "../stores/levelStore";
import { usePlayerStore } from "../stores/playerStore";
import { useChallengeStore } from "../stores/challengeStore";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../models/game";
import { Member, Player as PlayerModel } from "../models/player";
import { useCourtStore } from "../stores/courtStore";

enum Screen {
  MAIN,
  CHALLENGE,
}

const currentScreen = ref(Screen.MAIN);
const props = defineProps({ member: Member });
const levelStore = useLevelStore();
const playerStore = usePlayerStore();
const challengeStore = useChallengeStore();
const gameStore = useGameStore();
const courtStore = useCourtStore();
const emit = defineEmits(["close"]);
const targetLevel = ref();
const incumbents = computed(() => {
  selectedIncumbents.value = []; // Reset incumbents as a side-effect of changing target levels
  // Incumbents can be selected from members that are in the waiting queue or in a non-challenge games
  return playerStore.waitingPlayers
    .concat(
      gameStore.gamesOnDeck
        .filter((game) => !game.challenge)
        .reduce((accumulator, game) => {
          return accumulator.concat(game.players);
        }, [] as PlayerModel[])
    )
    .concat(
      courtStore.allCourts
        .filter((court) => court.game && !court.game.challenge)
        .reduce((accumulator, court) => {
          return accumulator.concat(court.game.players);
        }, [] as PlayerModel[])
    )
    .filter((player) => !player.isGuest && player.level == targetLevel.value);
});
const selectedIncumbents = ref([]);

function goToChallengeSetUp() {
  currentScreen.value = Screen.CHALLENGE;
}

async function createChallenge() {
  const challenge = await challengeStore.registerNewChallenge(
    props.member,
    targetLevel.value,
    selectedIncumbents.value
  );
  gameStore.addGameToOnDeckQueue(
    new Game([props.member, ...selectedIncumbents.value], challenge)
  );
  // TODO: remove players from their games/queues
  done();
}

function done() {
  emit("close");
}
</script>
