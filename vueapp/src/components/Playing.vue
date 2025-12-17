<template>
  <v-main class="queue bg-transparent">
    <Waiting />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue h-screen bg-transparent">
    <OnDeck />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="courts h-screen bg-transparent">
    <Venue />
  </v-main>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts"></script>
