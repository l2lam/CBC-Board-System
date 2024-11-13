<template>
  <v-card
    draggable="true"
    @dragstart="drag"
    @touchstart="drag"
    class="mx-auto ma-auto bg-surface-light"
    :class="court ? 'court-card' : 'queue-card'"
    variant="elevated"
    elevation="10"
    :color="flipped ? 'primary' : ''"
    v-on:click.self="flip"
  >
    <!-- The main view of the card, displaying the players in the game -->
    <v-card-title v-if="title" @click="flip">{{ title }}</v-card-title>
    <v-card-subtitle>
      {{ challengeGameInfo }}
    </v-card-subtitle>
    <v-card-text class="bg-surface-light" v-on:click.self="flip">
      <!-- The main view shows the list of players in the game -->
      <v-list v-if="!flipped" class="bg-surface-light" density="compact" @click="flip">
        <Player
          :player="player"
          v-for="player in game.players"
          :key="player.name"
        ></Player>
      </v-list>
      <!-- Challenge games on a court require winners to be selected before completion -->
      <v-list v-else-if="court && game.challenge">
        <Player v-for="player in game.players" :key="player.name" :player="player">
          <template v-slot:append>
            <v-checkbox-btn v-model="selectedWinners" :value="player"></v-checkbox-btn>
          </template>
        </Player>
      </v-list>
      <!-- On-deck games require a court to be selected to play on -->
      <v-select
        v-else-if="!court"
        label="Play"
        :items="courtStore.freeCourts"
        item-title="name"
        return-object
        v-model="selectedCourt"
        v-on:update:modelValue="moveGameToCourt()"
      ></v-select>
    </v-card-text>
    <!-- Actions for games on a court -->
    <v-card-actions v-if="flipped && court">
      <v-btn text="REMOVE" @click="addGameFromCourtToQueue()"></v-btn>
      <v-btn
        :disabled="game.challenge && selectedWinners.length == 0"
        text="COMPLETE GAME"
        @click="completeGame"
      ></v-btn>
    </v-card-actions>
    <!-- Actions in the game is in the on-deck queue -->
    <v-card-actions v-else-if="flipped">
      <v-btn text="CANCEL" @click="removeGameFromQueue"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useGameStore, DraggedGame } from "../stores/gameStore";
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
const challengeGameInfo = computed(() => {
  let result = "";
  let challenge = game.value.challenge;
  if (challenge) {
    let gameNumber = `Game #${challenge.scores.length + 1}`;
    if (flipped.value && court.value) result = `Select Winners for ${gameNumber}`;
    else if (challenge.scores.length > 0) {
      let wins = challenge.scores.filter((score) =>
        score.winners.includes(challenge.challenger)
      ).length;
      let losses = challenge.scores.filter((score) =>
        score.losers.includes(challenge.challenger)
      ).length;
      result = `${gameNumber}, ${wins}-${losses}`;
    } else result = gameNumber;
  }
  return result;
});

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

// Handle court/game dragging event.  Communicate the data via the event's dataTransfer configuration
function drag(evt) {
  gameStore.draggedGame = new DraggedGame(game.value.id, court.value?.id);
  console.log(`dragging ${gameStore.draggedGame.gameId}`);
  // evt.dataTransfer.setData("courtId", court.value.id);
  // evt.dataTransfer.setData("gameId", court.value.game?.id);
}
</script>
