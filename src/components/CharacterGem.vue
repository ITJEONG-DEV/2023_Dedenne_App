<template>
  <v-sheet>
    <v-list
      class="d-flex"
    >
      <v-list-item
        class="justify-center"
        v-for="item in props.gems?.Gems.slice(0, props.gems?.Gems.length/2)"
        :key="item.Icon"
      >
        <v-img
          :src="item.Icon"
          width="32px"
          height="32px"
        ></v-img>
        <v-list-item-subtitle v-text="item.Name.includes('홍') ? item.Name.split('>')[2].split('<')[0].split('레벨')[0] + '홍' : item.Name.split('>')[2].split('<')[0].split('')[0] + '멸' "></v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-list
      class="d-flex"
    >
      <v-list-item
        v-for="item in props.gems?.Gems.slice(props.gems?.Gems.length/2,)"
        :key="item.Icon"
      >
        <v-img
          :src="item.Icon"
          width="32px"
          height="32px"
        ></v-img>
        <v-list-item-subtitle v-text="item.Name.includes('홍') ? item.Name.split('>')[2].split('<')[0].split('레벨')[0] + '홍' : item.Name.split('>')[2].split('<')[0].split('')[0] + '멸' "></v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import type { IArmoryGem } from '../Requests';

const props = defineProps<{
    gems?: IArmoryGem
}>();
</script>