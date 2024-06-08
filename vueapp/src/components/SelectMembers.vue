<template>
  <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
    Select members to add
    <v-list>
      <v-list-item v-for="player in playerStore.selectableMembersForWaitingList">
        <v-container fluid class="d-flex align-center">
          <v-icon class="mr-2">mdi-account-circle</v-icon>
          {{ player.name }}
          <v-spacer></v-spacer>
          <v-checkbox v-model="selected" :value="player"></v-checkbox>
        </v-container>
      </v-list-item>
    </v-list>
    <v-btn
      height="72"
      min-width="140"
      prepend-icon="mdi-account-circle"
      :stacked="true"
      @click="addSelectedMembers"
      >
      Done
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

const emit = defineEmits(["close"]);
const playerStore = usePlayerStore();
const selected = ref([])

function addSelectedMembers() {
  selected.value.forEach(element => {
    playerStore.addPlayer(element)
  });
  done();
}

function done() {
    emit("close");
}
</script>
