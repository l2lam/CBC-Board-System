<template>
  <QueueColumn>
    <template v-slot:main>
      <p class="text-h6">Select members to add</p>
      <v-list>
        <Player
          :player="member"
          v-for="member in playerStore.selectableMembersForWaitingList"
          :key="member.id"
        >
          <template v-slot:append>
            <v-checkbox-btn v-model="selectedMembers" :value="member"></v-checkbox-btn>
          </template>
        </Player>
      </v-list>
    </template>
    <template v-slot:actions>
      <v-btn prepend-icon="mdi-check" :stacked="true" @click="addSelectedMembers">
        Done
      </v-btn>
    </template>
  </QueueColumn>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";

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
