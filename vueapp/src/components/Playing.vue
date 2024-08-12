<template>
  <v-main class="queue">
    <Waiting />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue h-screen">
    <OnDeck />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="courts h-screen">
    <Venue />
  </v-main>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts"></script>
