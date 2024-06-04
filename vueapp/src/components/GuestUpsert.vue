<template>
  <v-card
    prepend-icon="mdi-account-box-outline"
    text="Blah blah blah"
    :title="isNewPlayer ? 'New Guest' : 'Edit Guest'"
  >
    <div>
      <v-text-field
        label="Name"
        placeholder="Please enter a unique name for the Guest"
        v-model="guest.name"
        clearable
        :rules="[required]"
      ></v-text-field>
      <v-select
        label="Skill level"
        :items="levelStore.allLevels"
        item-title="name"
        v-model="guest.level"
      >
      </v-select>
    </div>
    <v-card-actions>
      <v-btn v-if="isNewPlayer" text="CANCEL" @click="done"></v-btn>
      <v-btn
        :text="isNewPlayer ? 'ADD' : 'DONE'"
        @click="save"
        :disabled="disableSave()"
      ></v-btn>
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
const guest = isNewPlayer.value ? ref(new Player("")) : ref(props.player);
const levelStore = useLevelStore();
const playerStore = usePlayerStore();

function disableSave() {
  return !guest.value.name;
}

function save() {
  if (isNewPlayer.value) playerStore.addPlayer(guest.value);
  done();
}

function done() {
  emit("close");
}

function required(val) {
  return !!val || "Field is required";
}
</script>
