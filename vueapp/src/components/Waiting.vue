<template>
  <v-sheet
    v-if="currentScreen == Screen.WAITING"
    class="pa-4 mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    height="100%"
  >
    <v-container
      fluid
      fill-height
      class="d-flex flex-column"
      style="height: 90%"
    >
      <div class="d-flex justify-space-between">
        <div class="text-h6">Waiting List</div>
        <div class="text-end">
          <v-btn
            v-if="enablePlayerRemoval"
            color="secondary"
            icon="mdi-close-circle-multiple-outline"
            variant="text"
            density="compact"
            @click="playerStore.removeAllPlayers()"
          ></v-btn>
        </div>
      </div>
      <v-list>
        <v-list-item
          v-for="player in playerStore.waitingPlayers"
          @click="playerSelected(player)"
          v-touch="{
            left: () => playerStore.removePlayer(player),
          }"
        >
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
          <template v-slot:append>
            <v-btn
              v-if="enablePlayerRemoval"
              color="secondary"
              icon="mdi-close-circle-outline"
              variant="text"
              density="compact"
              @click.stop="playerStore.removePlayer(player)"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <div class="text-center justify-space-evenly" style="height: 10%">
      <v-btn
        class="bottom-action"
        :prepend-icon="
          enablePlayerRemoval
            ? 'mdi-checkbox-outline'
            : 'mdi-checkbox-blank-outline'
        "
        :stacked="true"
        @click="enablePlayerRemoval = !enablePlayerRemoval"
      >
        Remove
      </v-btn>
      <v-btn
        class="bottom-action"
        prepend-icon="mdi-account-circle"
        :stacked="true"
      >
        + Member
      </v-btn>
      <v-btn
        class="bottom-action"
        prepend-icon="mdi-account-box-outline"
        :stacked="true"
        @click="addGuestPlayer"
      >
        + Guest
      </v-btn>
    </div>
  </v-sheet>
  <v-sheet v-else-if="currentScreen == Screen.GUEST">
    <GuestUpsert
      :player="currentPlayer"
      @close="returnToWaitingScreen"
    ></GuestUpsert>
  </v-sheet>
</template>

<style>
.bottom-action {
  height: 72;
  min-width: 140;
  margin-left: 5px;
  margin-right: 5px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";

enum Screen {
  WAITING,
  MEMBER,
  GUEST,
}

const playerStore = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);
const enablePlayerRemoval = ref(false);

function addGuestPlayer() {
  currentScreen.value = Screen.GUEST;
  currentPlayer.value = null;
}

function returnToWaitingScreen() {
  currentScreen.value = Screen.WAITING;
  currentPlayer.value = null;
}

function playerSelected(player) {
  currentPlayer.value = player;
  if (player.isGuest) currentScreen.value = Screen.GUEST;
  // else
  //   currentScreen = Screen.MEMBER
}
</script>
