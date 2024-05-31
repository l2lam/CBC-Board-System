<template>
  <v-container fluid fill-height class="d-flex flex-column">
    Waiting List
    <v-list>
      <v-list-item v-for="player in store.waitingPlayers">{{
        player.name
      }}</v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/playerStore";

const store = usePlayerStore();
</script>
