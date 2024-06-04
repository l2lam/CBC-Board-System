<template>
  <div>
    <v-sheet
      v-if="currentScreen == Screen.WAITING"
      class="pa-4 mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      height="100%"
    >
      <v-container fluid fill-height class="d-flex flex-column">
        Waiting List
        <v-list>
          <v-list-item
            v-for="player in store.waitingPlayers"
            @click="playerSelected(player)"
          >
            <template v-slot:prepend>
              <v-icon
                :icon="
                  player.is_guest
                    ? 'mdi-account-box-outline'
                    : 'mdi-account-circle'
                "
              ></v-icon>
            </template>
            {{ player.name }}</v-list-item
          >
        </v-list>
      </v-container>
      <v-divider class="mb-4"></v-divider>
      <div class="text-end">
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

const store = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);

function addGuestPlayer() {
  currentScreen.value = Screen.GUEST;
  currentPlayer.value = null;
}

function returnToWaitingScreen() {
  currentScreen.value = Screen.WAITING;
}

function playerSelected(player) {
  currentPlayer.value = player;
  if (player.is_guest) currentScreen.value = Screen.GUEST;
  // else
  //   currentScreen = Screen.MEMBER
}
</script>
