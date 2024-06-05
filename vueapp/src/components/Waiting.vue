<template>
  <v-container fluid fill-height class="d-flex flex-column">
    Waiting List
    <draggable
      :list=store.waitingPlayers
      :pull=false
      :push=false
    >
      <template #item="{ element }">
        <v-list-item :title="element.name">
        </v-list-item>
      </template>
    </draggable>
  </v-container>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/playerStore";
import draggable from "vuedraggable";

const store = usePlayerStore();
</script>
