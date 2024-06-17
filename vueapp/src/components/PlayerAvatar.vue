<template>
  <v-icon
    :icon="player.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'"
    :color="player?.level?.color"
    v-tooltip="(player.isGuest ? 'Guest (' : 'Member (') + (player?.level?.name || 'No Level') + ')'"
  ></v-icon>
</template>

<script setup lang="ts">
import { Player } from '../models/player';

defineProps<{
  player: Player
}>();
</script>