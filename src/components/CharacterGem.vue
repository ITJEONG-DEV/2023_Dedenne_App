<template>
  <v-sheet
    :style="'background-color: '+ props.bg + ';'"
  >
    <v-list
      class="d-flex ml-1"
      :style="'background-color: '+ props.bg + ';'"
    >
      <v-list-item
        class="justify-center ma-1 pa-0"
        v-for="item in props.gems?.Gems"
        :key="item.Icon"
      >
          <v-card
            variant="outlined"
            :class="item.Grade == '전설' ? 'legend_bg' : item.Grade == '유물' ? 'artifact_bg' : item.Grade == '고대' ? 'ancient_bg' : 'default_bg'"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
            ></v-img>
          </v-card>

        <v-card
          variant="outlined"
          class="ma-0 pa-0"
          width="32px"
          height="16px"
          style="top: -8px; background-color: #15181D; color: rgb(199, 170, 0); font-size:10px; font-weight: bold; text-align:center; border-color: black;"
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
    bg: string
}>();
</script>