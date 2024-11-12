<template>
  <QueueColumn v-if="currentScreen == Screen.ONDECKQUEUE">
    <template v-slot:main>
      <div class="d-flex">
        <v-icon icon="mdi-pause-circle"></v-icon>
        <p class="text-h6 pl-2">On Deck - {{ gameStore.gamesOnDeck.length }}</p>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-list>
        <draggable
          :list="gameStore.gamesOnDeck"
          item-key="id"
          v-bind="dragOptions"
          @dragstart="drag"
        >
          <template #item="{ element }">
            <div class="d-flex mb-3">
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

// Handle game dragging event (to a court).  Communicate the data via the event's dataTransfer configuration
function drag(evt) {
  // This is a horrible way of getting the dragged item
  var game = evt.srcElement.__draggable_context.element;
  evt.dataTransfer.setData("gameId", game.id);
  evt.dataTransfer.setData("fromOnDeck", true);
}
</script>
