<template>
    <v-sheet class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
      <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
        <p class="text-h6">Select players for game</p>
        <v-list>
          <v-list-item
            v-for="player in playerStore.waitingPlayers"
            :key="player.id"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-account-circle"></v-icon>
            </template>
            <v-list-item-title>
              {{ player.name }}
            </v-list-item-title>
            <template v-slot:append>
              <v-checkbox-btn v-model="selected" :value="player"></v-checkbox-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
      <v-divider class="mb-4"></v-divider>
      <div class="text-center justify-space-evenly" style="height: 10%">
        <v-btn
          height="72"
          min-width="140"
          prepend-icon="mdi-account-circle"
          :stacked="true"
          @click="addSelectedPlayers"
        >
          Done
        </v-btn>
      </div>
    </v-sheet>
  </template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";

const emit = defineEmits(["close"]);
const playerStore = usePlayerStore();
const selected = ref([]);

function addSelectedPlayers() {
  selected.value.forEach((element) => {
    //playerStore.addPlayer(element);
  });
  done();
}

function done() {
  emit("close");
}
</script>
