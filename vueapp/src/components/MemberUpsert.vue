<template>
  <QueueColumn>
    <template v-slot:main>
      <v-card :title="member.name" class="mx-auto" width="100%">
        <template v-slot:prepend>
          <PlayerAvatar :player="member" />
        </template>
        <div v-if="currentScreen == Screen.CHALLENGE">
          <v-card-subtitle>Initiate a Challenge</v-card-subtitle>
          <v-card-text>
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
          </v-card-text>
        </div>
      </v-card>
    </template>
    <template v-slot:actions>
      <div v-if="currentScreen == Screen.CHALLENGE" class="d-flex justify-space-evenly">
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
      <div v-else-if="currentScreen == Screen.MAIN" class="d-flex justify-space-evenly">
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
const DEFAULT_NUMBER_OF_INCUMBENTS_TO_SELECT = 3;
const incumbents = computed(() => {
  // Reset incumbents as a side-effect of changing target levels
  selectedIncumbents.value = [];

  // Incumbents can be selected from members that are in the waiting queue or in a non-challenge games
  var playersOnDeck = gameStore.gamesOnDeck
    .filter((game) => !game.challenge)
    .reduce((accumulator, game) => {
      return accumulator.concat(game.players);
    }, [] as PlayerModel[]);
  var playersOnCourt = courtStore.allCourts
    .filter((court) => court.game && !court.game.challenge)
    .reduce((accumulator, court) => {
      return accumulator.concat(court.game.players);
    }, [] as PlayerModel[]);

  var availableIncumbents = playerStore.waitingPlayers
    .concat(playersOnDeck)
    .concat(playersOnCourt)
    .filter((player) => !player.isGuest && player.level?.id == targetLevel.value.id);

  // Randomly select default incumbents for the challenge
  var n = availableIncumbents.length;
  if (n > DEFAULT_NUMBER_OF_INCUMBENTS_TO_SELECT) {
    // These are some prime numbers that are used to cycle through the incumbent list without duplication...
    // Unless the incumbent list is larger than these primes, then this does not always work
    const primes = [11321, 11329, 11351, 11353, 11369];
    var step = n;
    while (step == n) {
      step = primes[Math.floor(Math.random() * primes.length)];
    }
    var index = 0;
    for (var i = 0; i < DEFAULT_NUMBER_OF_INCUMBENTS_TO_SELECT; i++) {
      var index = (index + step) % n;
      selectedIncumbents.value.push(availableIncumbents[index]);
    }
  } else {
    selectedIncumbents.value = availableIncumbents;
  }

  return availableIncumbents;
});
const selectedIncumbents = ref([] as PlayerModel[]);

function goToChallengeSetUp() {
  currentScreen.value = Screen.CHALLENGE;
}

async function createChallenge() {
  const challenge = await challengeStore.registerNewChallenge(
    props.member,
    targetLevel.value,
    selectedIncumbents.value
  );

  // Remove players that are in the challenge from their current games/queues if applicable
  gameStore.gamesOnDeck.forEach((game) => {
    selectedIncumbents.value.forEach((player) => {
      game.removePlayer(player);
    });
  });
  courtStore.allCourts.forEach((court) => {
    if (court.game)
      selectedIncumbents.value.forEach((player) => {
        court.game.removePlayer(player);
      });
  });

  // Add the challenge game to the on deck queue
  gameStore.addGameToOnDeckQueue(
    new Game([props.member, ...selectedIncumbents.value], challenge)
  );
  done();
}

function done() {
  emit("close");
}
</script>
