<template>
  <v-list
  >
    <v-list-item
      v-for="item in props.equipments"
      :key="item.Name"
      class="d-flex"
    >
      <template v-slot:prepend>
        <v-img
        class="mr-2"
        :src="item.Icon"
        width="32px"
        height="32px"
      ></v-img>
      </template>

      <v-list-item-subtitle v-text="item.Name"></v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { IArmoryEquipment } from '../Requests';

const props = defineProps<{
    equipments?: Array<IArmoryEquipment>
}>();
</script>