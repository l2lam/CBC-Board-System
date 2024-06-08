<template>
  <v-card
    class="mx-auto w-100 ma-auto bg-surface-light"
    :class="court ? 'court-card' : 'queue-card'"
    variant="elevated"
    elevation="10"
    :color="flipped ? 'primary' : ''"
    @click="flipped = !flipped"
  >
    <!-- The main view of the card, displaying the players in the game -->
    <v-card-text v-if="!flipped" class="bg-surface-light">
      <v-card-title v-if="court">{{ court.name }}</v-card-title>
      <v-list class="bg-surface-light" density="compact">
        <v-list-item v-for="player in game.players">
          <template v-slot:prepend>
            <v-icon
              :icon="
                player.isGuest
                  ? 'mdi-account-box-outline'
                  : 'mdi-account-circle'
              "
            ></v-icon>
          </template>
          <v-list-item-title>
            {{ player.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <!-- The game options when the game is on a court -->
    <div v-else-if="court">
      <v-card-text> TODO </v-card-text>
      <v-card-actions>
        <v-btn
          text="REMOVE"
          @click="gameStore.removeGameAt(props.gameIndex)"
        ></v-btn>
      </v-card-actions>
    </div>
    <!-- The game options when in the game is in the on-deck queue -->
    <div v-else>
      <v-card-text>
        <v-select
          label="Play"
          :items="courtStore.freeCourts"
          item-title="name"
          return-object
          @click.stop=""
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text="REMOVE"
          @click="gameStore.removeGameAt(props.gameIndex)"
        ></v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import { useCourtStore } from "../stores/courtStore";

const props = defineProps(["game", "gameIndex", "court"]);
const game = ref(props.game);
const court = ref(props.court);
const gameStore = useGameStore();
const courtStore = useCourtStore();
const flipped = ref(false);
</script>
