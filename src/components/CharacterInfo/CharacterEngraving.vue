<template>
  <v-sheet
    :style="'background-color: '+ props.bg + ';'"
  >
    <v-list
      class="d-flex mt-1"
      :style="'background-color: '+ props.bg + ';'"
      width="300px"
    >
      <v-list-item
        v-for="item in props.engraving?.Engravings"
        :key="item.Name"
      >
        <template v-slot:prepend>
          <v-avatar
            width="32px"
            height="32px"
            class="mr-2"
          >
            <v-img
              :src="props.dev ? '' : item.Icon"
            ></v-img>
          </v-avatar>
        </template>
        <v-list-item-subtitle
          class="text-white"
          style="font-weight: bold;"
        >
          {{ item.Name }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>


    <v-list
      :style="'background-color: '+ props.bg + ';'"
    >
      <v-list-item
        class="justify-center"
        v-for="item in props.engraving?.Effects"
        :key="item.Name"
      >
        <v-list-item-subtitle
          class="text-white"
        >
          {{ item.Name }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import type { IArmoryEngraving } from '../Requests';

const props = defineProps<{
    engraving?: IArmoryEngraving
    bg: string
    dev: boolean
}>();
</script>