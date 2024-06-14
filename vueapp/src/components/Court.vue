<template>
  <div>
    <!-- A court with a game on it -->
    <Game
      v-if="court && court.game"
      :game="court.game"
      :court="court"
      class="courtcard"
    ></Game>
    <!-- A court with no game playing on it -->
    <v-card v-else-if="court" class="pa-2 ma-2 court-card">
      <v-card-title>{{ court.name }}</v-card-title>
      <v-card-subtitle>Available</v-card-subtitle>
    </v-card>
    <!-- Empty space (no court) in the grid -->
    <v-card v-else class="pa-2 ma-2 court-card"> </v-card>
  </div>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["court"]);
const court = ref(props.court);
</script>
