<template>
  <v-card
    class="mx-auto ma-auto bg-surface-light"
    :class="court ? 'court-card' : 'queue-card'"
    variant="elevated"
    elevation="10"
    :color="flipped ? 'primary' : ''"
    v-on:click.self="flip"
  >
    <!-- The main view of the card, displaying the players in the game -->
    <v-card-title v-if="title" @click="flip">{{ title }}</v-card-title>
    <v-card-text v-if="!flipped" class="bg-surface-light" @click="flip">
      <v-list class="bg-surface-light" density="compact">
        <Player
          :player="player"
          v-for="player in game.players"
          :key="player.name"
        ></Player>
      </v-list>
    </v-card-text>
    <!-- The game options when the game is on a court -->
    <div v-else-if="court">
      <div v-if="game.challenge">
        <!-- Challenge games require winners to be selected before completion -->
        <v-card-text> Select winners </v-card-text>
        <v-list>
          <Player v-for="player in game.players" :key="player.name" :player="player">
            <template v-slot:append>
              <v-checkbox-btn v-model="selectedWinners" :value="player"></v-checkbox-btn>
            </template>
          </Player>
        </v-list>
      </div>
      <v-card-actions>
        <v-btn text="REMOVE" @click="addGameFromCourtToQueue()"></v-btn>
        <v-btn
          :disabled="game.challenge && selectedWinners.length == 0"
          text="COMPLETE GAME"
          @click="completeGame"
        ></v-btn>
      </v-card-actions>
    </div>
    <!-- The game options when in the game is in the on-deck queue -->
    <div v-else>
      <v-card-text v-on:click.self="flip">
        <v-select
          label="Play"
          :items="courtStore.freeCourts"
          item-title="name"
          return-object
          v-model="selectedCourt"
          v-on:update:modelValue="moveGameToCourt()"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn text="CANCEL" @click="removeGameFromQueue"></v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";
import { usePlayerStore } from "../stores/playerStore";
import { useChallengeStore } from "../stores/challengeStore";
import { ChallengeState } from "../models/challenge";

const props = defineProps(["game", "court"]);
const game = ref(props.game);
const court = ref(props.court);
const selectedCourt = ref();
const gameStore = useGameStore();
const courtStore = useCourtStore();
const playerStore = usePlayerStore();
const challengeStore = useChallengeStore();
const flipped = ref(false);
const title = computed(() => {
  if (game.value.challenge && court.value) return `${court.value.name} - Challenge`;
  if (game.value.challenge) return "Challenge";
  if (court.value) return court.value.name;
  return undefined;
});
const selectedWinners = ref([]);

function flip() {
  flipped.value = !flipped.value;
}

function addGameFromCourtToQueue() {
  gameStore.addGameToOnDeckQueue(court.value.game);
  courtStore.removeGameFromCourt(court.value);
}

function removeGameFromQueue() {
  gameStore.removeFromOnDeck(game.value);
}

function moveGameToCourt() {
  selectedCourt.value.game = game.value;
  gameStore.removeFromOnDeck(game.value, false);
}

async function completeGame() {
  let challenge = game.value.challenge;
  if (challenge) {
    // Record the score for the challenge
    let losers = game.value.players.filter((x) => !selectedWinners.value.includes(x));
    await challengeStore.registerScore(challenge, selectedWinners.value, losers, "");

    // If the challenge is complete then return players to the waiting queue
    if (challenge.state() != ChallengeState.INCOMPLETE) {
      returnPlayersToWaitingQueue();
    }
    // Otherwise send the challenge game back to the on-deck queue
    else {
      addGameFromCourtToQueue();
    }
  } else {
    returnPlayersToWaitingQueue();
  }
}

function returnPlayersToWaitingQueue() {
  court.value.game.players.forEach((player) => {
    playerStore.addPlayer(player);
  });
  courtStore.removeGameFromCourt(court.value);
}
</script>
