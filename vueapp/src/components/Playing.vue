<template>
  <v-layout class="rounded rounded-md h-100">
    <v-app-bar title="CBC Board System">
      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      </template>
    </v-app-bar>
    <v-main class="queue h-screen">
      <Waiting />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="queue h-screen">
      <OnDeck />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="courts h-screen">
      <Venue />
    </v-main>
  </v-layout>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { usePlayerStore } from "../stores/playerStore";
import { useLevelStore } from "../stores/levelStore";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";
import { useTheme } from "vuetify";
import { ref } from "vue";

const playerStore = usePlayerStore();
await playerStore.loadPlayers();
const levelStore = useLevelStore();
await levelStore.loadLevels();
const gameStore = useGameStore();
await gameStore.loadGames();
const courtStore = useCourtStore();
await courtStore.loadCourts();

let isDarkTheme = true;
const theme = useTheme();

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  theme.global.name.value = isDarkTheme ? "dark" : "light";
}
</script>
