<template>
  <v-sheet
    v-if="currentScreen == Screen.ONDECKQUEUE"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <v-container
      fluid
      fill-height
      class="d-flex flex-column"
      style="height: 90%"
    >
      <p class="text-h6 text-left mb-4">On Deck</p>
      <v-list>
        <draggable
          :list="gameStore.gamesOnDeck"
          item-key="id"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <template #item="{ element }">
            <div class="d-flex mb-3">
              <Game :game="element"></Game>
            </div>
          </template>
        </draggable>
      </v-list>
    </v-container>
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
  <v-sheet v-else-if="currentScreen == Screen.CREATEGAME">
    <CreateGame @close="returntoOnDeckQueue()"></CreateGame>
  </v-sheet>
</template>

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

function returntoOnDeckQueue() {
  currentScreen.value = Screen.ONDECKQUEUE;
}

function goToCreateGameUpsert() {
  currentScreen.value = Screen.CREATEGAME;
}

const dragOptions = {
  animation: 100,
};
</script>
