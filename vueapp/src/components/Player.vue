<template>
  <v-list-item>
    <template v-slot:prepend>
      <PlayerAvatar :player="player" />
    </template>
    <v-tooltip :text="player.name" open-delay="500" location="top">
      <template #activator="{ props: tooltipProps }">
        <v-list-item-title v-bind="tooltipProps">
          {{ player.name }}
        </v-list-item-title>
      </template>
    </v-tooltip>
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
