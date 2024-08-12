<template>
  <v-main class="queue">
    <CRUDList :crud-model="clubsCrud" />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue">
    <CRUDList :crud-model="memberCrud" />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue">
    <CRUDList :crud-model="levelsCrud" />
  </v-main>
  <v-divider vertical></v-divider>
  <v-main class="queue">
    <CRUDList :crud-model="courtsCrud" />
  </v-main>
</template>

<style>
@import "@/assets/styles/custom.css";
</style>

<script setup lang="ts">
import { ref } from "vue";
import { ClubsCrud } from "../models/clubsCrud";
import { LevelsCrud } from "../models/levelsCrud";
import { CourtsCrud } from "../models/courtsCrud";
import { MembersCrud } from "../models/membersCrud";

const clubsCrud = ref(new ClubsCrud());
const memberCrud = ref(new MembersCrud());
const levelsCrud = ref(new LevelsCrud());
const courtsCrud = ref(new CourtsCrud());
</script>
