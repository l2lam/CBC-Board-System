<template>
  <draggable v-model="courts" item-key="id" @drop="drop" @touchend="drop">
    <template #item="{ element: court }">
      <div>
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
        <v-card v-else class="pa-2 ma-2 court-card"> </v-card>
      </div>
    </template>
  </draggable>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import draggable from "vuedraggable";
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";

const props = defineProps(["court"]);
const courts = ref([props.court]);
const court = ref(props.court);
const gameStore = useGameStore();
const courtStore = useCourtStore();

// Handle the drop event when something gets dropped onto a court.
function drop(evt) {
  var draggedGame = gameStore.draggedGame;
  console.log("drop", draggedGame);
  if (draggedGame) {
    // var sourceGameId = evt.dataTransfer.getData("gameId");
    var sourceGame = gameStore.findGameById(draggedGame.gameId);
    console.log("source Game", sourceGame);
    console.log("court", court.value);

    // If the game is found and the destination court doesn't contain a game and set the game
    if (sourceGame && !court.value.game) {
      // If the game came from another court then find the court and remove the game from it
      var sourceCourtId = draggedGame.courtId; //evt.dataTransfer.getData("fromOnDeck");
      if (sourceCourtId) {
        var sourceCourt = sourceCourtId
          ? courtStore.allCourts.find((c) => c.id == sourceCourtId)
          : undefined;
        if (sourceCourt) courtStore.removeGameFromCourt(sourceCourt);
      }

      // Assign the game to the destination court
      if (courtStore.assignGameToCourt(court.value, sourceGame)) {
        // If the game came from the on-deck queue then remove it from the queue
        if (!sourceCourtId) {
          gameStore.removeFromOnDeck(sourceGame, false);
        } else {
        }
      }
    }
  }
}
</script>
