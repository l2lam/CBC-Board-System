<template>
  <v-card
    max-width="400"
    prepend-icon="mdi-account-box-outline"
    text="Blah blah blah"
    title="Guest"
  >
    <div>
      <v-text-field label="Name"></v-text-field>
      <v-select
        label="Skill level"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      ></v-select>
    </div>
    <template v-slot:actions>
      <v-btn class="ms-auto" text="Ok" @click="save"></v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const props = defineProps(["player"]);

function save() {
  emit("close");
}
</script>
