<template>
  <v-sheet class="pa-4 mx-auto" max-width="600" width="100%" height="100%">
    <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      <p class="text-h6">Select members to add</p>
      <v-list>
        <Player :player="member" v-for="member in playerStore.selectableMembersForWaitingList" :key="member.id">
          <template v-slot:button>
            <v-checkbox-btn v-model="selectedMembers" :value="member"></v-checkbox-btn>
          </template>
        </Player>
      </v-list>
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <div class="text-center justify-space-evenly" style="height: 10%">
      <v-btn
        height="72"
        min-width="140"
        prepend-icon="mdi-account-circle"
        :stacked="true"
        @click="addSelectedMembers"
      >
        Done
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import Player from "./Player.vue";

const emit = defineEmits(["close"]);
const playerStore = usePlayerStore();
const selectedMembers = ref([]);

function addSelectedMembers() {
  selectedMembers.value.forEach((element) => {
    playerStore.addPlayer(element);
  });
  done();
}

function done() {
  emit("close");
}
</script>
