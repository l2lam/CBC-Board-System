<template>
  <v-sheet v-if="currentScreen == Screen.ONDECK" class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      <p class="text-h6 text-center">On-deck</p>
      <Game
        v-for="(game, index) in gameStore.gamesOnDeck"
        :key="game.id"
        :game="game"
        :gameIndex="index"
      ></Game>
      <v-btn
        class="bottom-action"
        prepend-icon="mdi-account-circle"
        :stacked="true"
        @click=
      >
        + Game
      </v-btn>
    </v-container>
  </v-sheet>
  <v-sheet v-if="currentScreen == Screen.CREATEGAME"> 
    <CreateGame></CreateGame>
  </v-sheet>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";
import { ref } from "vue";

enum Screen {
  ONDECK,
  CREATEGAME,
}

const currentScreen = ref(Screen.CREATEGAME);
const gameStore = useGameStore();

function returntoOnDeckQueue() {
  currentScreen.value = Screen.ONDECK;
}

</script>
