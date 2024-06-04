<template>
  <v-card
    prepend-icon="mdi-account-box-outline"
    text="Blah blah blah"
    :title="isNewPlayer ? 'New Guest' : 'Edit Guest'"
  >
    <div>
      <v-text-field label="Name" v-model="guest.name"></v-text-field>
      <v-select
        label="Skill level"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
      ></v-select>
    </div>
    <template v-slot:actions>
      <v-btn
        class="ms-auto"
        :text="isNewPlayer ? 'ADD' : 'SAVE'"
        @click="save"
      ></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "../models/player";

const emit = defineEmits(["close"]);
const props = defineProps(["player"]);
const isNewPlayer = computed(() => (props.player ? false : true));
const guest = isNewPlayer.value ? ref(new Player("Test")) : props.player;

function save() {
  emit("close");
}
</script>
