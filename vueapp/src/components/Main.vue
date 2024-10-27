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
    <!-- <Playing v-if="currentScreen == Screen.PLAYING"></Playing> -->
    <!-- <Administration v-if="currentScreen == Screen.ADMIN"></Administration> -->
  </v-layout>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { useTheme } from "vuetify";
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

let isDarkTheme = true;
const theme = useTheme();

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  theme.global.name.value = isDarkTheme ? "dark" : "light";
}
</script>
