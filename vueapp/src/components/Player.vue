<template>
  <v-list-item>
    <template v-slot:prepend>
      <PlayerAvatar :player />
    </template>
    <v-list-item-title>
      {{ player.name }}
    </v-list-item-title>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { Player } from '../models/player';
import PlayerAvatar from './PlayerAvatar.vue';

defineProps<{
  player: Player
}>();
</script>
