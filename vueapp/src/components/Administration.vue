<template>
  <v-main class="queue">
    <CRUDList :crud-model="clubsCrud" />
  </v-main>
  <v-divider vertical></v-divider>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { ClubsCrud } from "../models/clubsCrud";

const clubsCrud = ref(new ClubsCrud());
</script>
