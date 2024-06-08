<template>
  <v-sheet
    v-if="currentScreen == Screen.WAITING"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      <div class="d-flex justify-space-between">
        <p class="text-h6">Waiting List</p>
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
        <draggable
          :list="playerStore.waitingPlayers"
          itemKey="name"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <template #item="{ element }">
            <v-list-item @click="playerSelected(element)">
              <template v-slot:prepend>
                <v-icon
                  :icon="
                    element.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'
                  "
                ></v-icon>
              </template>
              <v-list-item-title>
                {{ element.name }}
              </v-list-item-title>
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
            </v-list-item>
          </template>
        </draggable>
      </v-list>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <div class="text-center justify-space-evenly" style="height: 10%">
      <v-btn
        class="bottom-action"
        :prepend-icon="
          enablePlayerRemoval ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline'
        "
        :stacked="true"
        @click="enablePlayerRemoval = !enablePlayerRemoval"
      >
        Remove
      </v-btn>
      <v-btn class="bottom-action" prepend-icon="mdi-account-circle" :stacked="true">
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
    <GuestUpsert :player="currentPlayer" @close="returnToWaitingScreen"></GuestUpsert>
  </v-sheet>
</template>

<style>
.bottom-action {
  height: 72;
  min-width: 100;
  margin-left: 5px;
  margin-right: 5px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import draggable from "vuedraggable";

enum Screen {
  WAITING,
  MEMBER,
  GUEST,
}

const playerStore = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);
const enablePlayerRemoval = ref(false);
const dragOptions = {
  animation: 0,
  disabled: false,
  ghostClass: "ghost",
};

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
