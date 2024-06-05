<template>

  <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      Select members to add
      <v-list>
        <v-list-item
          v-for="player in store.allPlayers"
        >
          <v-checkbox>  
            <template v-slot:prepend>
              <v-icon
                :icon="player.isGuest ? 'mdi-account-box-outline' : 'mdi-account-circle'"
              ></v-icon>
            </template>
            {{ player.name }}
          </v-checkbox>
        </v-list-item>
      </v-list>
      <v-btn
          height="72"
          min-width="140"
          prepend-icon="mdi-account-circle"
          :stacked="true"
          @click="addMemberPlayers"
        >
         Done
        </v-btn>
    </v-container>
    
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

const store = usePlayerStore();
const currentScreen = ref(Screen.WAITING);
const currentPlayer = ref(null);

function addSelectedMembers() {

}

</script>
