<template>
  <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      Waiting List
      <v-list>
        <v-list-item
          v-for="player in store.waitingPlayers"
          @click="playerSelected(player)"
        >
          <template v-slot:prepend>
            <v-icon
              :icon="player.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'"
            ></v-icon>
          </template>
          {{ player.name }}</v-list-item
        >
      </v-list>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

const store = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);
</script>
