<template>
  <v-list-item>
    <template v-slot:prepend>
      <PlayerAvatar :player="player" />
    </template>
    <v-list-item-title v-tooltip="player.name">
      {{ player.name }}
    </v-list-item-title>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { Player } from "../models/player";

const props = defineProps<{
  player: Player;
}>();
</script>
