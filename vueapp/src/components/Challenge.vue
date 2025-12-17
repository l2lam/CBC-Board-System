<template>
  <v-card class="ma-6 glass-card" color="transparent">
    <v-card-title>
      <PlayerAvatar :player="challenge.challenger" />
      {{ challenge.challenger.name }}
    </v-card-title>
    <v-card-subtitle>{{ state }}</v-card-subtitle>
    <v-card-text>
      <v-list class="bg-transparent">
        <v-list-subheader>Incumbents</v-list-subheader>
        <Player
          v-for="incumbent in challenge.incumbents"
          :key="incumbent.name"
          :player="incumbent"
        >
        </Player>
      </v-list>
      <v-list v-if="challenge.scores.length > 0" class="bg-transparent">
        <v-list-subheader>Scores</v-list-subheader>
        <v-list-item v-for="(score, index) in challenge.scores">
          {{ `Game ${index + 1}: ${score}` }}
        </v-list-item>
      </v-list>
      <p v-else>No scores reported</p>
    </v-card-text>
  </v-card>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { computed } from "vue";
import { Challenge, ChallengeState } from "../models/challenge";
import moment from "moment";

const props = defineProps<{
  challenge: Challenge;
}>();

const state = computed(() => {
  let result: string[] = [];
  result.push(`Started ${moment(props.challenge?.date).fromNow()}.`);
  switch (props.challenge?.state()) {
    case ChallengeState.INCOMPLETE:
      result.push("The challenge is still active.");
      break;
    case ChallengeState.SUCCESSFUL:
      result.push("The challenge was SUCCESSFUL.");
      let failedIncumbent = props.challenge.incumbentThatIsKnockedDown();
      if (failedIncumbent)
        result.push(`${failedIncumbent.name} is knocked down a level.`);
      break;
    case ChallengeState.UNSUCCESSFUL:
      result.push("The challenge was UNSUCCESSFUL");
      break;
  }
  return result.join(" ");
});
</script>
