<template>
  <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      Select members to add
      <v-list>
        <v-list-item v-for="player in store.selectableMembersForWaitingList">
            <v-checkbox
              v-model="selected"
              :value="player" 
              :label="player.name">
            </v-checkbox>
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
import { Ref, ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";
import { Player } from "../models/player";

const emit = defineEmits(["close"]);
const store = usePlayerStore();
const selected = ref([])

function addSelectedMembers() {
  selected.value.forEach(element => {
    store.addPlayer(element)
  });
  done();
}

function done() {
    emit("close");
}

</script>
