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
        v-model="targetLevel"
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
    <QueueColumn>
      <template v-slot:main>
        <p class="text-h6">Select Players for Game</p>
        <v-list>
          <Player
            :player="member"
            v-for="member in challengers"
            :key="member.name"
          >
            <template v-slot:append>
              <v-checkbox-btn
                v-model="selectedChallengers"
                :value="member"
              ></v-checkbox-btn>
            </template>
          </Player>
        </v-list>
      </template>
      <template v-slot:actions>
        <v-btn prepend-icon="mdi-check" :stacked="true" @click="createChallenge">
          Done
        </v-btn>
      </template>
    </QueueColumn>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLevelStore } from "../stores/levelStore";
import SelectChallenger from "./SelectChallenger.vue";
import { usePlayerStore } from "../stores/playerStore";

enum Screen {
  INITIALSCREEN,
  SETUPSCREEN,
  SELECTCHALLENGERS,
}

const currentScreen = ref(Screen.INITIALSCREEN);
const props = defineProps(["player"]);
const member = ref(props.player);
const levelStore = useLevelStore();
const playerStore = usePlayerStore();
const emit = defineEmits(["close"]);
const targetLevel = ref(member.value.level);
const challengers = ref([]);
const selectedChallengers = ref([]);

function goToChallengeSetUp() {
  currentScreen.value = Screen.SETUPSCREEN;
}

function goToChallengerSelect() {
  playerStore.allMembers.forEach((member) => {
    if (targetLevel.value == member.level) {
      challengers.value.push(member);
    }
  });
  currentScreen.value = Screen.SELECTCHALLENGERS;
}

function createChallenge() {

  done();
}

function done() {
  emit("close");
}
</script>
