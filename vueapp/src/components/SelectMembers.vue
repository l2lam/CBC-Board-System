<template>
  <v-container fluid fill-height class="d-flex flex-column" style="height: 90%">
      Select members to add
      <v-list>
        <v-list-item v-for="player in store.allMembers">
          <v-checkbox
            v-model="selected"
            :value="player">  
              <template v-slot:prepend>
                <v-icon
                  icon="mdi-account-circle"
                ></v-icon>
                {{ player.name }}
              </template>
            </v-checkbox>
          </v-list-item>
        </v-list>
      <v-btn
        height="72"
        min-width="140"
        prepend-icon="mdi-account-circle"
        :stacked="true"
        @click="addSelectedMembers"
      >
      Done
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "@/stores/playerStore";

const emit = defineEmits(["close"]);
const store = usePlayerStore();
const selected = ref([])

function addSelectedMembers() {
  //add selected members from array to waiting queue
  done();
}
  
function done() {
    emit("close");
}

</script>
