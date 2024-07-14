<template>
  <v-sheet class="pa-4 mx-auto overflow-auto" width="100%" height="100%">
    <!-- <v-container fluid fill-height class="overflow-auto" height="-webkit-fill-available"> -->
    <div class="d-flex justify-center">
      <v-icon :icon="headingIcon"></v-icon>
      <p class="text-h6 pl-2">{{ headingText }}</p>
      <v-spacer></v-spacer>
      <div class="text-end">
        <v-btn
          v-if="currentScreen == Screen.VENUES"
          :icon="CHALLENGES_ICON"
          density="compact"
          v-tooltip="'Show Current Challenges'"
          @click="currentScreen = Screen.CHALLENGES"
        ></v-btn>
        <v-btn
          v-else-if="currentScreen == Screen.CHALLENGES"
          :icon="VENUES_ICON"
          density="compact"
          v-tooltip="'Show Venues'"
          @click="currentScreen = Screen.VENUES"
        ></v-btn>
      </div>
    </div>
    <v-divider class="mb-4"></v-divider>
    <v-row v-for="row in nRows" :key="row">
      <v-col v-for="court in courts(row - 1)" :key="court?.id" align-self="center">
        <Court :court="court"></Court>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </v-sheet>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useCourtStore } from "../stores/courtStore";

enum Screen {
  VENUES,
  CHALLENGES,
}
const currentScreen = ref(Screen.VENUES);
const VENUES_ICON = "mdi-play-circle";
const CHALLENGES_ICON = "mdi-one-up";
const headingIcon = computed(() => {
  switch (currentScreen.value) {
    case Screen.VENUES:
      return VENUES_ICON;
    case Screen.CHALLENGES:
      return CHALLENGES_ICON;
  }
  return "";
});
const headingText = computed(() => {
  switch (currentScreen.value) {
    case Screen.VENUES:
      return "Playing";
    case Screen.CHALLENGES:
      return "Challenges";
  }
  return "";
});

const courtStore = useCourtStore();
const nRows = 3;
const nCols = 3;

// Get the list of courts for the given row
function courts(row) {
  var startIndex = row * nCols;
  var result = courtStore.allCourts.slice(startIndex, startIndex + nCols);
  var nBlanks = nCols - result.length;

  for (var i = 0; i < nBlanks; i++) result.push(undefined);
  return result;
}
</script>
