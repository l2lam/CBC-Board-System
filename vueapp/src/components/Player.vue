<template>
<v-list-item>
  <template v-slot:prepend>
    <v-icon
      :icon="player.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'"
    ></v-icon>
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

defineProps<{
  player: Player
}>();
</script>
