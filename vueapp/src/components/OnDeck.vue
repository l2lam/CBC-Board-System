<template>
  <v-sheet
    class="pa-4 mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    height="100%"
  >
    <v-container
      fluid
      fill-height
      class="d-flex flex-column"
      style="height: 90%"
    >
      <div class="text-h6">On-deck</div>
      <Game
        v-for="(game, index) in gameStore.gamesOnDeck"
        :key="game.id"
        :game="game"
        :gameIndex="index"
      ></Game>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();
</script>
