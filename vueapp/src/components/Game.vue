<template>
  <transition name="flip">
    <v-card
      class="mx-auto w-100 ma-2 bg-surface-light"
      variant="elevated"
      :color="flipped ? 'primary' : 'secondary'"
    >
      <v-card-text
        v-if="!flipped"
        class="bg-surface-light"
        @click="flipped = !flipped"
      >
        <v-list class="bg-surface-light">
          <v-list-item v-for="player in game.players">
            <template v-slot:prepend>
              <v-icon
                :icon="
                  player.isGuest
                    ? 'mdi-account-box-outline'
                    : 'mdi-account-circle'
                "
              ></v-icon>
            </template>
            <v-list-item-title>
              {{ player.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <div v-else>
        <v-card-text>
          <v-select
            label="Play"
            :items="['TODO - Court 1', 'TODO - Court 2']"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="REMOVE"
            @click="gameStore.removeGameAt(props.gameIndex)"
          ></v-btn>
          <v-btn text="BACK" @click="flipped = !flipped"></v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";

const props = defineProps(["game", "gameIndex"]);
const game = ref(props.game);
const gameStore = useGameStore();
const flipped = ref(false);
</script>
