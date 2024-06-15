<template>
  <v-sheet class="pa-4 mx-auto" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column">
      <p class="text-h6 text-center">Playing</p>
      <v-container fill-height>
        <v-row v-for="row in nRows" :key="row" height="300px">
          <v-col
            v-for="court in courts(row - 1)"
            :key="court?.id"
            align-self="center"
            class="fill-height"
          >
            <Court :court="court"></Court>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-sheet>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { useCourtStore } from "../stores/courtStore";

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
