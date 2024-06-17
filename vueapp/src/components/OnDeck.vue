<template>
  <v-sheet
    v-if="currentScreen == Screen.ONDECKQUEUE"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <v-container fluid fill-height class="queue-top d-flex flex-column">
      <div class="d-flex">
        <v-icon icon="mdi-pause-circle"></v-icon>
        <p class="text-h6 pl-2">On Deck</p>
      </div>
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
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-container class="queue-bottom">
      <v-row height="100%">
        <v-col>
          <v-btn
            prepend-icon="mdi-account-circle"
            :stacked="true"
            @click="goToCreateGameUpsert"
          >
            + Game
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-sheet
    v-else-if="currentScreen == Screen.CREATEGAME"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <CreateGame @close="returnToOnDeckQueue"></CreateGame>
  </v-sheet>
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
