<template>
  <v-card
    text="Blah blah blah"
    :title=member.name
    class="mx-auto"
    width="90%"
  >
    <template v-slot:prepend>
      <PlayerAvatar :player />
    </template>
    <v-card-actions>
      <v-btn text="Initiate challenge" @click="initiateChallenge"></v-btn>
      <v-spacer></v-spacer>
      <v-btn text="DONE" @click="done"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PlayerAvatar from "./PlayerAvatar.vue";

const props = defineProps(["player"]);
const member = ref(props.player);
const emit = defineEmits(["close"]);

function initiateChallenge() {
  // will initiate a challenge
}

function done() {
  emit("close");
}
</script>
