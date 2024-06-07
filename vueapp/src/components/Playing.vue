<template>
  <v-layout class="rounded rounded-md h-100">
    <v-app-bar title="CBC Board System"></v-app-bar>
    <v-main class="queue h-screen">
      <Waiting />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="queue h-screen">
      <OnDeck />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="courts h-screen">
      <Courts />
    </v-main>
  </v-layout>
</template>

<style>
.queue {
  width: 20%;
}
.courts {
  width: 60%;
}
</style>

<script setup lang="ts">
import { usePlayerStore } from "../stores/playerStore";
import { useLevelStore } from "../stores/levelStore";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";

const playerStore = usePlayerStore();
await playerStore.loadPlayers();
const levelStore = useLevelStore();
await levelStore.loadLevels();
const gameStore = useGameStore();
await gameStore.loadGames();
const courtStore = useCourtStore();
await courtStore.loadCourts();
</script>
