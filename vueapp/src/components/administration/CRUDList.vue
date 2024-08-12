<template>
  <QueueColumn v-if="currentScreen == Screen.MAIN">
    <template v-slot:main>
      <div class="d-flex justify-space-between">
        <v-icon :icon="crudModel.icon"></v-icon>
        <p class="text-h6 pl-2">{{ crudModel.title }}</p>
        <v-spacer></v-spacer>
        <div class="text-end">
          <v-btn
            :icon="enableItemRemoval ? 'mdi-delete-off' : 'mdi-delete'"
            variant="text"
            density="compact"
            v-tooltip="'Enable deletion'"
            @click="enableItemRemoval = !enableItemRemoval"
          ></v-btn>
        </div>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-list>
        <v-list-item v-for="item in itemsList" :key="item.id" @click="selectItem(item)">
          <v-list-item-title :style="crudModel.getItemStyle(item)">
            {{ crudModel.getItemTitle(item) }}
          </v-list-item-title>
          <template v-slot:append>
            <slot name="append">
              <v-btn
                v-if="enableItemRemoval"
                color="secondary"
                icon="mdi-close-circle-outline"
                variant="text"
                density="compact"
                @click.stop="removeItem(item)"
              ></v-btn>
            </slot>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:actions>
      <v-btn prepend-icon="mdi-plus-circle" :stacked="true" @click="addNewItem">
        New
      </v-btn>
    </template>
  </QueueColumn>
  <CRUDEdit
    v-else-if="currentScreen == Screen.EDIT"
    :crudModel="crudModel"
    :item="currentItem"
    @close="returnToMainScreen"
  ></CRUDEdit>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

enum Screen {
  MAIN,
  EDIT,
}
const currentScreen = ref(Screen.MAIN);

function returnToMainScreen() {
  currentScreen.value = Screen.MAIN;
  currentItem.value = null;
}

const dragOptions = {
  animation: 100,
  ghostClass: "ghost",
};

const enableItemRemoval = ref(false);
const props = defineProps(["crudModel"]);
const crudModel = ref(props.crudModel);
const itemsList = computed(() => {
  return crudModel.value.itemsList();
});
const currentItem = ref(null);

function selectItem(item) {
  currentItem.value = item;
  currentScreen.value = Screen.EDIT;
}
function removeItem(item) {
  crudModel.value.removeItem(item);
}
function addNewItem(item) {
  currentItem.value = null;
  currentScreen.value = Screen.EDIT;
}
</script>
