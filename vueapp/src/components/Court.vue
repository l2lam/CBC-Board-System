<template>
  <div
    draggable="true"
    @dragenter="dragEnter"
    @dragover="dragEnter"
    @dragstart="drag"
    @drop="drop"
  >
    <!-- A court with a game on it -->
    <Game
      v-if="court && court.game"
      :game="court.game"
      :court="court"
      class="pa-2, ma-2 court-card"
    ></Game>
    <!-- A court with no game playing on it -->
    <v-card v-else-if="court" class="pa-2 ma-2 court-card">
      <v-card-title>{{ court.name }}</v-card-title>
      <v-card-subtitle>Available</v-card-subtitle>
    </v-card>
    <!-- Empty space (no court) in the grid -->
    <v-card v-else class="pa-2 ma-2 court-card" @drop="drop"> </v-card>
  </div>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";

const props = defineProps(["court"]);
const courts = ref([props.court]);
const court = ref(props.court);
const gameStore = useGameStore();
const courtStore = useCourtStore();

const dragOptions = {
  animation: 100,
};

function dragEnter(evt) {
  evt.preventDefault();
}

// Handle court/game dragging event.  Communicate the data via the event's dataTransfer configuration
function drag(evt) {
  evt.dataTransfer.setData("courtId", court.value.id);
  evt.dataTransfer.setData("gameId", court.value.game?.id);
}

// Handle the drop event when something gets dropped onto a court.
function drop(evt) {
  var sourceGameId = evt.dataTransfer.getData("gameId");
  var sourceGame = gameStore.findGameById(sourceGameId);

  // If the game is found and the destination court doesn't contain a game and set the game
  if (sourceGame && !court.value.game) {
    // Assign the game to the destination court
    court.value.game = sourceGame;

    // If the game came from the on-deck queue then remove it from the queue
    var fromOnDeck = evt.dataTransfer.getData("fromOnDeck");
    if (fromOnDeck) {
      gameStore.removeFromOnDeck(sourceGame, false);
    } else {
      // If the game came from another court then find the court and remove the game from it
      var sourceCourtId = evt.dataTransfer.getData("courtId");
      var sourceCourt = sourceCourtId
        ? courtStore.allCourts.find((c) => c.id == sourceCourtId)
        : undefined;
      if (sourceCourt) sourceCourt.game = undefined;
    }
  }
  evt.preventDefault();
}
</script>
