<template>
  <div style="height: 100%">
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
        Waiting List
        <v-list>
          <v-list-item
            v-for="player in playerStore.waitingPlayers"
            @click="playerSelected(player)"
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
                color="pink"
                icon="mdi-close-circle-outline"
                variant="text"
                @click.stop="removePlayer(player)"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
      <v-divider class="mb-4"></v-divider>
      <div class="text-end" style="height: 10%">
        <v-btn
          height="72"
          min-width="140"
          prepend-icon="mdi-account-circle"
          :stacked="true"
        >
          Add Member
        </v-btn>
        <v-btn
          height="72"
          min-width="140"
          prepend-icon="mdi-account-box-outline"
          :stacked="true"
          @click="addGuestPlayer"
        >
          Add Guest
        </v-btn>
      </div>
    </v-sheet>
    <v-sheet v-else-if="currentScreen == Screen.GUEST">
      <GuestUpsert
        :player="currentPlayer"
        @close="returnToWaitingScreen"
      ></GuestUpsert>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

enum Screen {
  WAITING,
  MEMBER,
  GUEST,
}

const playerStore = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);

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

function removePlayer(player) {
  console.log("removing player:", player);
  playerStore.removePlayer(player);
}
</script>
