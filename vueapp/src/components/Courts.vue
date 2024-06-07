<template>
  <v-sheet class="pa-4 mx-auto" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column">
      <p class="text-h6 text-center">Playing</p>
      <v-container fill-height>
        <v-row v-for="row in nRows" :key="row" no-gutters>
          <v-col v-for="court in courts(row - 1)" :key="court?.id" align-self="center">
            <div v-if="court">
              <Game v-if="court.game" :game="court.game" :court="court"></Game>
              <v-card v-else class="pa-2 ma-2">
                <v-card-title>{{ court.name }}</v-card-title>
                <v-card-subtitle>Available</v-card-subtitle>
              </v-card>
            </div>
            <div v-else>
              <v-card class="pa-2 ma-2">
                <v-card-title>SPACE</v-card-title>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-sheet>
</template>

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
