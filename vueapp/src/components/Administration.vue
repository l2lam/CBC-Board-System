<template>
  <v-main class="queue">
    <CRUDList :crud-model="clubsCrud" />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue">
    <CRUDList :crud-model="levelsCrud" />
  </v-main>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { ClubsCrud } from "../models/clubsCrud";
import { LevelsCrud } from "../models/levelsCrud";

const clubsCrud = ref(new ClubsCrud());
const levelsCrud = ref(new LevelsCrud());
</script>
