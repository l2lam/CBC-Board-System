<template>
  <v-container fluid fill-height class="d-flex flex-column">
    Waiting List
    <v-list>
      <v-list-item v-for="n in 10">{{ n }}</v-list-item>
    </v-list>
  </v-container>
</template>