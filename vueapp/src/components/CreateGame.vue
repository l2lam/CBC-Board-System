<template>
  <QueueColumn>
    <template v-slot:main>
      <p class="text-h6">Select Players for the Game</p>
      <v-list class="bg-transparent">
        <Player
          :player="player"
          v-for="player in playerStore.waitingPlayers"
          :key="player.name"
        >
          <template v-slot:append>
            <v-checkbox-btn v-model="selectedPlayers" :value="player"></v-checkbox-btn>
          </template>
        </Player>
      </v-list>
    </template>
    <template v-slot:actions>
      <v-btn
        prepend-icon="mdi-check"
        :stacked="true"
        @click="createGame"
        class="attention-btn"
      >
        Done
      </v-btn>
    </template>
  </QueueColumn>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import { useGameStore } from "../stores/gameStore";
import { Game } from "../models/game";

const emit = defineEmits(["close"]);
const playerStore = usePlayerStore();
const gameStore = useGameStore();
const selectedPlayers = ref([]);

function createGame() {
  if (selectedPlayers.value.length > 0)
    gameStore.addGameToOnDeckQueue(new Game(selectedPlayers.value));
  done();
}

function done() {
  emit("close");
}
</script>
