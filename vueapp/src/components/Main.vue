<template>
  <v-layout class="h-100 bg-transparent">
    <v-app-bar :title="title" class="glass-panel ma-2" flat color="transparent">
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
    <FlyingAnimationOverlay />
  </v-layout>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { useClubStore } from "../stores/clubStore";
import { computed, onBeforeMount, onUnmounted, ref, watch } from "vue";
import FlyingAnimationOverlay from "./FlyingAnimationOverlay.vue";

enum Screen {
  PLAYING,
  ADMIN,
}
const currentScreen = ref(Screen.PLAYING);

watch(currentScreen, (newScreen) => {
  if (newScreen === Screen.ADMIN) {
    document.body.classList.add("static-background");
  } else {
    document.body.classList.remove("static-background");
  }
});

onUnmounted(() => {
  document.body.classList.remove("static-background");
});

const title = computed(() => {
  switch (currentScreen.value) {
    case Screen.PLAYING:
      return clubStore.currentClub?.name;
    case Screen.ADMIN:
      return "Administration";
  }
});

const clubStore = useClubStore();
onBeforeMount(async () => {
  await clubStore.loadClubs();
});

let isDarkTheme = true;
const theme = useTheme();

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  theme.global.name.value = isDarkTheme ? "dark" : "light";
}
</script>
