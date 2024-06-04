<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="CBC Board System"></v-app-bar>
    <v-main class="w-25">
      <Waiting />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="w-25">
      <OnDeck />
    </v-main>
    <v-divider vertical></v-divider>
    <v-main class="w-50">
      <Courts />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
//
import { usePlayerStore } from "@/stores/playerStore";
import { useLevelStore } from "@/stores/levelStore";

const playerStore = usePlayerStore();
await playerStore.loadPlayers();
const levelStore = useLevelStore();
await levelStore.loadLevels();
</script>
