<template>
    <v-card
      prepend-icon="mdi-account-box-outline"
      text="Blah blah blah"
      title="Edit Member"
      class="mx-auto"
      width="90%"
    >
      <div>
        <v-select
          label="Skill level"
          :items="levelStore.allLevels"
          item-title="name"
          v-model="guest.level"
        >
        </v-select>
      </div>
      <v-card-actions>
        <v-btn 
        text="Initiate challenge"
        @click="initiateChallenge"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text="DONE"
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

  function initiateChallenge() {
    // will initiate a challenge
  }
  
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
  