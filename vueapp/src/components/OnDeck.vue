<template>
  <QueueColumn v-if="currentScreen == Screen.ONDECKQUEUE">
    <template v-slot:main>
      <div class="d-flex">
        <v-icon icon="mdi-pause-circle"></v-icon>
        <p class="text-h6 pl-2">On Deck - {{ gameStore.gamesOnDeck.length }}</p>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-list>
        <draggable :list="gameStore.gamesOnDeck" item-key="id" v-bind="dragOptions">
          <template #item="{ element }">
            <div class="cards">
              <Game :game="element"></Game>
            </div>
          </template>
        </draggable>
      </v-list>
    </template>
    <template v-slot:actions>
      <div class="d-flex justify-space-evenly">
        <v-btn prepend-icon="mdi-gamepad" :stacked="true" @click="goToCreateGameUpsert">
          + Game
        </v-btn>
      </div>
    </template>
  </QueueColumn>
  <CreateGame
    v-else-if="currentScreen == Screen.CREATEGAME"
    @close="returnToOnDeckQueue"
  ></CreateGame>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";
import { ref } from "vue";
import draggable from "vuedraggable";

enum Screen {
  ONDECKQUEUE,
  CREATEGAME,
}

const currentScreen = ref(Screen.ONDECKQUEUE);
const gameStore = useGameStore();

function returnToOnDeckQueue() {
  currentScreen.value = Screen.ONDECKQUEUE;
}

function goToCreateGameUpsert() {
  currentScreen.value = Screen.CREATEGAME;
}

const dragOptions = {
  animation: 100,
};
</script>
