<template>
  <v-list
  >
    <v-list-item
      v-for="item in props.equipments"
      :key="item.Name"
      class="d-flex"
    >
      <template v-slot:prepend>
          <v-card
            variant="outlined"
            :class="'mr-2 ' + (item.Grade == '전설' ? 'legend_bg' : item.Grade == '유물' ? 'artifact_bg' : item.Grade == '고대' ? 'ancient_bg' : 'default_bg')"
            width="32px"
            :height="item.Type == '팔찌' ? '32px' : '36px'"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>

        <template v-if="item.Type == '어빌리티 스톤'">
          <v-card
            variant="outlined"
            class="ma-0 pa-0"
            width="32px"
            height="16px"
            style="position:absolute; top: 36px; background-color: black; font-size:10px; font-weight:bold; text-align:center;"
          >
            <span
              class="quality_10 ma-0 pa-0"
            >
              {{ getAbilitystoneText(item.Tooltip).slice(0,3) }}
            </span>
            <span
              class="quality_0 ma-0 pa-0"
            >
              {{ getAbilitystoneText(item.Tooltip).slice(3) }}
            </span>
          </v-card> 
        </template>

        <template v-else-if="item.Type != '팔찌'">
          <v-card
            variant="outlined"
            :class="'ma-0 pa-0 ' + (getQuality(item.Tooltip) == 100 ? 'quality_100_bg' : getQuality(item.Tooltip) > 90 ? 'quality_90_bg' : getQuality(item.Tooltip) > 70 ? 'quality_70_bg' : getQuality(item.Tooltip) > 30 ? 'quality_30_bg' : getQuality(item.Tooltip) > 10 ? 'quality_10_bg' : 'quality_0_bg' )"
            width="32px"
            height="16px"
            style="position:absolute; top: 36px; font-size:10px; font-weight:bold; text-align:center; color:white; border-color: black;"
          >
            {{ getQualityText(item.Tooltip) }}
          </v-card> 
        </template>

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

function getQualityText(tooltip: string): string {
  for(let line of tooltip.split('\n')) {
    if(line.includes('qualityValue')) {
      return line.split(':')[1].split(',')[0];
    }
  }

  return "";
}

function getQuality(tooltip: string): number {
  return Number(getQualityText(tooltip));
}

function getAbilitystoneText(tooltip: string): string {
  let text = "";
  for(let line of tooltip.split('\n')) {
    if(line.includes('활성도')) {
      text += line.split('+')[1].split('<')[0] + " ";
    }
  }

  return text;
}

</script>