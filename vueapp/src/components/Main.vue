<template>
  <v-layout class="rounded rounded-md h-100">
    <v-app-bar :title="title">
      <template v-slot:append>
        <v-btn
          v-if="currentScreen == Screen.PLAYING"
          icon="mdi-cog"
          @click="currentScreen = Screen.ADMIN"
          v-tooltip="'Club administration'"
        ></v-btn>
        <v-btn
          v-else-if="currentScreen == Screen.ADMIN"
          icon="mdi-play"
          @click="currentScreen = Screen.PLAYING"
          v-tooltip="'Return to playing screen'"
        ></v-btn>
        <v-btn
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
          v-tooltip="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
        ></v-btn>
      </template>
    </v-app-bar>
    <Playing v-if="currentScreen == Screen.PLAYING"></Playing>
    <Administration v-if="currentScreen == Screen.ADMIN"></Administration>
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
import { useChallengeStore } from "../stores/challengeStore";
import { useClubStore } from "../stores/clubStore";
import { computed, ref } from "vue";

enum Screen {
  PLAYING,
  ADMIN,
}
const currentScreen = ref(Screen.PLAYING);
const title = computed(() => {
  switch (currentScreen.value) {
    case Screen.PLAYING:
      return clubStore.currentClub?.name;
    case Screen.ADMIN:
      return "Administration";
  }
});

const clubStore = useClubStore();
await clubStore.loadClubs();
const levelStore = useLevelStore();
await levelStore.loadLevels();
const gameStore = useGameStore();
await gameStore.loadGames();
const courtStore = useCourtStore();
await courtStore.loadCourts();
const playerStore = usePlayerStore();
await playerStore.loadPlayers();
const challengeStore = useChallengeStore();
await challengeStore.loadChallenges();

let isDarkTheme = true;
const theme = useTheme();

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  theme.global.name.value = isDarkTheme ? "dark" : "light";
}
</script>
