<template>
  <v-card
    v-if="currentScreen == Screen.INITIALSCREEN"
    prepend-icon="mdi-account-circle"
    text="Blah blah blah"
    :title="member.name"
    class="mx-auto"
    width="90%"
  >
    <v-card-actions>
      <v-btn text="Initiate challenge" @click="goToChallengeSetUp"></v-btn>
      <v-spacer></v-spacer>
      <v-btn text="DONE" @click="done"></v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    v-if="currentScreen == Screen.SETUPSCREEN"
    prepend-icon="mdi-account-circle"
    text="Blah blah blah"
    :title="member.name"
    class="mx-auto"
    width="90%"
  >
    <div>
      <v-select
        label="Target level"
        :items="levelStore.allLevels"
        item-title="name"
        v-model="member.level"
      >
      </v-select>
    </div>
    <v-card-actions>
      <v-btn
        stacked="true"
        text="Select challengers"
        @click="goToChallengerSelect"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-sheet
    v-else-if="currentScreen == Screen.SELECTCHALLENGERS"
    class="pa-4 mx-auto"
    max-width="600"
    width="100%"
    height="100%"
  >
    <SelectChallenger @close="returnToOnDeckQueue"></SelectChallenger>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLevelStore } from "../stores/levelStore";
import SelectChallenger from "./SelectChallenger.vue";

enum Screen {
  INITIALSCREEN,
  SETUPSCREEN,
  SELECTCHALLENGERS,
}

const currentScreen = ref(Screen.INITIALSCREEN);
const props = defineProps(["player"]);
const member = ref(props.player);
const levelStore = useLevelStore();
const emit = defineEmits(["close"]);

function goToChallengeSetUp() {
  currentScreen.value = Screen.SETUPSCREEN;
}

function goToChallengerSelect() {
  currentScreen.value = Screen.SELECTCHALLENGERS;
}

function done() {
  emit("close");
}
</script>
