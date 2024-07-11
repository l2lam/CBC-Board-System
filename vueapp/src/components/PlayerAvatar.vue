<template>
  <v-icon
    :icon="player.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'"
    :color="player.level?.color"
    v-tooltip="getTooltip()"
  ></v-icon>
</template>

<script setup lang="ts">
import { Player } from "../models/player";

const props = defineProps<{
  player: Player;
}>();

function getTooltip() {
  var levelName = props.player.level?.name || "No Level";
  return props.player.isGuest ? `Guest (${levelName})` : `Member (${levelName})`;
}
</script>
