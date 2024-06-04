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
        :items="levelStore.allLevels"
        item-title="name"
        v-model="guest.level"
      >
      </v-select>
    </div>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text="CANCEL" @click="emit('close')"></v-btn>
      <v-btn :text="isNewPlayer ? 'ADD' : 'SAVE'" @click="save"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "../models/player";
import { useLevelStore } from "@/stores/levelStore";
import { usePlayerStore } from "@/stores/playerStore";

const emit = defineEmits(["close"]);
const props = defineProps(["player"]);
const isNewPlayer = computed(() => props.player == null);
const guest = isNewPlayer.value ? ref(new Player("Test")) : props.player;
const levelStore = useLevelStore();
const playerStore = usePlayerStore();

function save() {
  if (isNewPlayer.value) playerStore.addPlayer(guest.value);
  emit("close");
}
</script>
