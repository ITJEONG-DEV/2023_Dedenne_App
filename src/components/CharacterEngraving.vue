<template>
  <v-sheet>
    <v-list
      class="d-flex"
    >
      <v-list-item
        class="justify-center"
        v-for="item in props.engraving?.Engravings"
        :key="item.Name"
      >
        <v-img
          :src="item.Icon"
          width="32px"
          height="32px"
        ></v-img>
        <v-list-item-subtitle>{{ item.Name }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <template v-if="props.engraving != null && props.engraving.Effects.length > 6">
      <v-list
        class="d-flex pa-0"
      >
        <v-list-item
          class="justify-center"
          v-for="item in props.engraving?.Effects.slice(0, props.engraving?.Effects.length/2)"
          :key="item.Name"
        >
          <v-list-item-subtitle>{{ item.Name }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-list
        class="d-flex pa-0"
      >
        <v-list-item
          class="justify-center"
          v-for="item in props.engraving?.Effects.slice(props.engraving?.Effects.length/2, )"
          :key="item.Name"
        >
          <v-list-item-subtitle>{{ item.Name }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>

    <template v-if="props.engraving != null && props.engraving.Effects.length <= 6">
      <v-list
        class="d-flex"
      >
        <v-list-item
          class="justify-center"
          v-for="item in props.engraving?.Effects"
          :key="item.Name"
        >
          <v-list-item-subtitle>{{ item.Name }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </template>

    

  </v-sheet>
</template>

<script setup lang="ts">
import type { IArmoryEngraving } from '../Requests';

const props = defineProps<{
    engraving?: IArmoryEngraving
}>();
</script>