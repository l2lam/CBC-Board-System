<template>
  <QueueColumn>
    <template v-slot:main>
      <div class="d-flex justify-space-between">
        <v-icon :icon="crudModel.icon"></v-icon>
        <p class="text-h6 pl-2">{{ title }}</p>
        <v-spacer></v-spacer>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-form>
        <div v-for="field in editFields" :key="field.label">
          <v-select
            v-if="field instanceof OptionsEditField"
            :label="field.label"
            v-model="field.value"
            :items="field.options"
            :item-props="true"
          ></v-select>
          <v-checkbox
            v-if="field instanceof BoolEditField"
            :label="field.label"
            v-model="field.value"
          ></v-checkbox>
          <v-text-field
            v-else-if="field instanceof TextEditField"
            :label="field.label"
            :type="field.type"
            v-model="field.value"
          >
          </v-text-field>
        </div>
      </v-form>
    </template>
    <template v-slot:actions>
      <div class="d-flex justify-space-evenly">
        <v-btn
          prepend-icon="mdi-cancel"
          :stacked="true"
          text="CANCEL"
          @click="cancel"
        ></v-btn>
        <v-btn
          :prepend-icon="isNewItem ? 'mdi-plus' : 'mdi-check'"
          stacked
          :text="isNewItem ? 'Add' : 'Save'"
          @click="save"
        ></v-btn>
      </div>
    </template>
  </QueueColumn>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BoolEditField, OptionsEditField, TextEditField } from "../../models/crudBase";

const emit = defineEmits(["close"]);
const props = defineProps(["item", "crudModel"]);
const item = ref(props.item);
const crudModel = ref(props.crudModel);
const isNewItem = computed(() => props.item == null);
const editFields = computed(() => crudModel.value.getItemEditFields(item.value));
const title = computed(
  () => `${crudModel.value.title} - ${isNewItem.value ? "New" : "Edit"}`
);

function cancel(item) {
  done();
}

function save() {
  crudModel.value.upsertItem(item.value);
  done();
}

function done() {
  emit("close");
}
</script>
