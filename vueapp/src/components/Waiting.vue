<template>
  <QueueColumn v-if="currentScreen == Screen.WAITING">
    <template v-slot:main>
      <div class="d-flex justify-space-between align-center">
        <v-icon icon="mdi-timer-sand"></v-icon>
        <p class="text-h6 pl-2">Waiting - {{ count }}</p>
        <v-btn
          v-if="enableEditMode"
          color="error"
          icon="mdi-close-circle-multiple-outline"
          variant="text"
          density="compact"
          class="ml-2"
          v-tooltip="'Remove all players'"
          @click="confirmRemoveAll = true"
        ></v-btn>
        <v-spacer></v-spacer>
        <div class="text-end">
          <v-btn
            :icon="enableEditMode ? 'mdi-pencil-off' : 'mdi-pencil'"
            variant="text"
            density="compact"
            v-tooltip="enableEditMode ? 'Disable edit mode' : 'Enable edit mode'"
            @click="enableEditMode = !enableEditMode"
          ></v-btn>
        </div>
      </div>
      <v-divider class="mb-4"></v-divider>
      <draggable
        id="waiting-list-container"
        :list="playerStore.waitingPlayers"
        itemKey="name"
        v-bind="dragOptions"
        :force-fallback="true"
        :disabled="enableEditMode"
        class="v-list v-list--density-default v-theme--light v-list--one-line bg-transparent"
      >
        <template #item="{ element }">
          <div class="list-item-wrapper" :class="{ 'edit-mode': enableEditMode }">
            <Player :player="element" @click="enableEditMode ? playerSelected(element) : null">
              <template v-slot:append>
                <v-btn
                  v-if="enableEditMode"
                  color="secondary"
                  icon="mdi-close-circle-outline"
                  variant="text"
                  density="compact"
                  @click.stop="playerStore.removePlayer(element)"
                ></v-btn>
              </template>
            </Player>
          </div>
        </template>
      </draggable>

      <v-dialog v-model="confirmRemoveAll" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Confirm Removal</v-card-title>
          <v-card-text>Are you sure you want to remove all players from the waiting list?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" variant="text" @click="confirmRemoveAll = false">Cancel</v-btn>
            <v-btn color="error" variant="text" @click="executeRemoveAll">Remove All</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:actions>
      <div class="d-flex justify-space-evenly">
        <v-btn class="glass-btn" prepend-icon="mdi-account-plus" :stacked="true" @click="addMemberPlayers">
          Member
        </v-btn>
        <v-btn
          class="glass-btn"
          prepend-icon="mdi-account-plus-outline"
          :stacked="true"
          @click="addGuestPlayer"
        >
          Guest
        </v-btn>
      </div>
    </template>
  </QueueColumn>
  <GuestUpsert
    v-else-if="currentScreen == Screen.GUEST"
    :player="currentPlayer"
    @close="returnToWaitingScreen"
  ></GuestUpsert>
  <MemberUpsert
    v-else-if="currentScreen == Screen.MEMBER"
    :member="currentPlayer"
    @close="returnToWaitingScreen"
  ></MemberUpsert>
  <SelectMembers
    v-else-if="currentScreen == Screen.SELECTMEMBERS"
    :player="currentPlayer"
    @close="returnToWaitingScreen"
  ></SelectMembers>
</template>

<style scoped>
#waiting-list-container {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.list-item-wrapper {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.list-item-wrapper.edit-mode {
  cursor: pointer;
}
</style>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import draggable from "vuedraggable";
import Player from "./Player.vue";
import MemberUpsert from "./MemberUpsert.vue";
import GuestUpsert from "./GuestUpsert.vue";

enum Screen {
  WAITING,
  MEMBER,
  GUEST,
  SELECTMEMBERS,
}

const playerStore = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);
const enableEditMode = ref(false);
const confirmRemoveAll = ref(false);
const dragOptions = {
  animation: 100,
  ghostClass: "ghost",
};

const count = computed(() => playerStore.waitingPlayers.length);

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

function executeRemoveAll() {
  playerStore.removeAllPlayers();
  confirmRemoveAll.value = false;
  enableEditMode.value = false;
}
</script>
