<template>
  <v-sheet>
    <v-list
      class="d-flex ml-1"
    >
      <v-list-item
        class="justify-center ma-1 pa-0"
        v-for="item in props.gems?.Gems"
        :key="item.Icon"
      >
      <template v-if="item.Grade == '전설'">
          <v-card
            variant="outlined"
            class="legend"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '유물'">
          <v-card
            variant="outlined"
            class="artifact"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '고대'">
          <v-card
            variant="outlined"
            class="ancient"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
            ></v-img>
          </v-card>
        </template>

        <template v-else>
          <v-card
            variant="outlined"
            class="mb-1 default"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
            ></v-img>
          </v-card>
        </template>

        <v-card
          variant="outlined"
          class="ma-0 pa-0"
          width="32px"
          height="16px"
          style="top: -8px; background-color: white; font-size:10px; font-weight:bold; text-align:center;"
        >
          {{ item.Name.split('>')[2].split('<')[0].split('레벨')[0] }}
        </v-card>     
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