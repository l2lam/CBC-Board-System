<template>
  <v-sheet
    v-if="currentScreen == Screen.WAITING"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <v-container fluid fill-height class="queue-top d-flex flex-column">
      <div class="d-flex justify-space-between">
        <p class="text-h6 mb-3">Waiting List</p>
        <div class="text-end">
          <v-btn
            v-if="enablePlayerRemoval"
            color="secondary"
            icon="mdi-close-circle-multiple-outline"
            variant="text"
            density="compact"
            v-tooltip="'Remove all players'"
            @click="playerStore.removeAllPlayers()"
          ></v-btn>
          <v-btn
            :icon="enablePlayerRemoval ? 'mdi-delete-off' : 'mdi-delete'"
            variant="text"
            density="compact"
            v-tooltip="'Enable removal of players'"
            @click="enablePlayerRemoval = !enablePlayerRemoval"
          ></v-btn>
        </div>
      </div>
      <v-list>
        <draggable
          :list="playerStore.waitingPlayers"
          itemKey="name"
          v-bind="dragOptions"
          :force-fallback="true"
        >
          <template #item="{ element }">
            <Player
              :player="element"
              @click="playerSelected(element)"
            >
              <template v-slot:append>
                <v-btn
                  v-if="enablePlayerRemoval"
                  color="secondary"
                  icon="mdi-close-circle-outline"
                  variant="text"
                  density="compact"
                  @click.stop="playerStore.removePlayer(element)"
                ></v-btn>
              </template>
            </Player>
          </template>
        </draggable>
      </v-list>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-container class="queue-bottom">
      <v-row height="100%">
        <v-col>
          <v-btn
            prepend-icon="mdi-account-circle"
            :stacked="true"
            @click="addMemberPlayers"
          >
            + Member
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            prepend-icon="mdi-account-box-outline"
            :stacked="true"
            @click="addGuestPlayer"
          >
            + Guest
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-sheet v-else-if="currentScreen == Screen.GUEST">
    <GuestUpsert :player="currentPlayer" @close="returnToWaitingScreen"></GuestUpsert>
  </v-sheet>
  <v-sheet v-else-if="currentScreen == Screen.MEMBER">
    <MemberUpsert :player="currentPlayer" @close="returnToWaitingScreen"></MemberUpsert>
  </v-sheet>
  <SelectMembers
    v-else-if="currentScreen == Screen.SELECTMEMBERS"
    :player="currentPlayer"
    @close="returnToWaitingScreen"
  ></SelectMembers>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import draggable from "vuedraggable";
import Player from "./Player.vue";

enum Screen {
  WAITING,
  MEMBER,
  GUEST,
  SELECTMEMBERS,
}

const playerStore = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);
const enablePlayerRemoval = ref(false);
const dragOptions = {
  animation: 100,
  ghostClass: "ghost",
};

function addGuestPlayer() {
  currentScreen.value = Screen.GUEST;
  currentPlayer.value = null;
}

function addMemberPlayers() {
  currentScreen.value = Screen.SELECTMEMBERS;
  currentPlayer.value = null;
}

function returnToWaitingScreen() {
  currentScreen.value = Screen.WAITING;
  currentPlayer.value = null;
}

function playerSelected(player) {
  currentPlayer.value = player;
  if (player.isGuest) currentScreen.value = Screen.GUEST;
  else currentScreen.value = Screen.MEMBER;
}
</script>
