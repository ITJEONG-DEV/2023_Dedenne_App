<template>
  <v-sheet>
    <v-list
      class="d-flex"
    >
      <v-list-item
        v-for="item in props.card?.Cards"
        :key="item.Icon"
      >
        <v-img
          :src="item.Icon"
          width="32px"
          height="64px"
        ></v-img>
        <v-list-item-subtitle :v-text="item.Name"></v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-list
      v-for="effect in props.card?.Effects"
      :key="effect.Index"
    >
      <v-list-item
        v-for="item in effect.Items"
        :key="item.Name"
      >
        <v-list-item-title>{{ item.Name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.Description }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { IArmoryCard } from '../Requests';

const props = defineProps<{
    card?: IArmoryCard
}>();

onMounted(() => {
  console.log("cards", props.card)
})

</script>