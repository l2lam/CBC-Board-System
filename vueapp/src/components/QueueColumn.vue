<template>
  <v-sheet class="pa-4 mx-auto glass-panel" max-width="600" width="100%" height="100%" color="transparent">
    <div class="queue-top d-flex flex-column">
      <slot name="main"></slot>
    </div>
    <v-divider class="mb-4"></v-divider>
    <div class="queue-bottom">
      <slot name="actions"></slot>
    </div>
  </v-sheet>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>
