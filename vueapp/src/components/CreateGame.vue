<template>
  <v-sheet class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
    <v-container
      fluid
      fill-height
      class="d-flex flex-column"
      style="height: 90%"
    >
      <p class="text-h6">Select Players for Game</p>
      <v-list>
        <Player :player="player" v-for="player in playerStore.waitingPlayers">
          <template v-slot:button>
            <v-checkbox-btn
              v-model="selectedPlayers"
              :value="player"
            ></v-checkbox-btn>
          </template>
        </Player>
      </v-list>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <div class="text-center justify-space-evenly" style="height: 10%">
      <v-btn
        height="72"
        min-width="140"
        prepend-icon="mdi-account-circle"
        :stacked="true"
        @click="createGame"
      >
        Done
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../models/game";
import Player from "./Player.vue";

const emit = defineEmits(["close"]);
const playerStore = usePlayerStore();
const gameStore = useGameStore();
const selectedPlayers = ref([]);

function createGame() {
  if (selectedPlayers.value.length > 0)
    gameStore.addGameToOnDeckQueue(new Game(selectedPlayers.value));
  selectedPlayers.value.forEach((player) => {
    playerStore.removePlayer(player);
  });
  done();
}

function done() {
  emit("close");
}
</script>
