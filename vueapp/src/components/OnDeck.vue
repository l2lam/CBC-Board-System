<template>
  <v-sheet class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      <p class="text-h6 text-center">On-deck</p>
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
