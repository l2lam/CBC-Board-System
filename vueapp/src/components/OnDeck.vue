<template>
  <v-sheet class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      <p class="text-h6 text-left mb-4">On Deck</p>
      <v-list>
        <draggable
          :list="gameStore.gamesOnDeck"
          item-key="id"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <template #item="{ element, index }">
            <div class="d-flex mb-3">
              <Game
                :game="element"
                :gameIndex="index"
              ></Game>
            </div>
          </template>
        </draggable>
      </v-list>
    </v-container>
  </v-sheet>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import draggable from "vuedraggable";

const gameStore = useGameStore();
const dragOptions = {
  animation: 100,
}
</script>
