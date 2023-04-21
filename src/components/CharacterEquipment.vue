<template>
  <v-list
    :style="'background-color: ' + props.bg + ';'"
  >
    <v-list-item
      v-for="item in props.equipments"
      :key="item.name"
      class="d-flex"
    >

      <template v-slot:prepend>
        <template v-if="item.value == null">
          <v-card
            variant="outlined"
            class="'mr-2 none_bg'"
            width="32px"
            height="32px"
          >
          </v-card>
        </template>

        <template v-else>
          <v-card
            variant="outlined"
            :class="'mr-2 ' + (item.value.Grade == '전설' ? 'legend_bg' : item.value.Grade == '유물' ? 'artifact_bg' : item.value.Grade == '고대' ? 'ancient_bg' : 'default_bg')"
            width="32px"
            :height="item.value.Type == '팔찌' ? '32px' : '36px'"
          >
            <v-img
              :src="item.value.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>

        <template v-if="item.value.Type == '어빌리티 스톤'">
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
              {{ getAbilitystoneText(item.value.Tooltip).slice(0,3) }}
            </span>
            <span
              class="quality_0 ma-0 pa-0"
            >
              {{ getAbilitystoneText(item.value.Tooltip).slice(3) }}
            </span>
          </v-card> 
        </template>

        <template v-else-if="item.value.Type != '팔찌'">
          <v-card
            variant="outlined"
            :class="'ma-0 pa-0 ' + (getQuality(item.value.Tooltip) == 100 ? 'quality_100_bg' : getQuality(item.value.Tooltip) > 90 ? 'quality_90_bg' : getQuality(item.value.Tooltip) > 70 ? 'quality_70_bg' : getQuality(item.value.Tooltip) > 30 ? 'quality_30_bg' : getQuality(item.value.Tooltip) > 10 ? 'quality_10_bg' : 'quality_0_bg' )"
            width="32px"
            height="16px"
            style="position:absolute; top: 36px; font-size:10px; font-weight:bold; text-align:center; color:white; border-color: black;"
          >
            {{ getQualityText(item.value.Tooltip) }}
          </v-card> 
        </template>

        </template>

      </template>

      <template v-if="item.value">
      <v-list-item-subtitle
        :style="'font-weight: bold; ' + (item.value.Grade == '고대' ? 'color: #E3C7A1;' : item.value.Grade == '유물' ? 'color: #FA5D00;' : item.value.Grade == '전설' ? 'color: #F99200 ;' : item.value.Grade == '영웅' ? 'color: #CE43FC;' : item.value.Grade == '희귀' ?  'color: #00B0FA;' : item.value.Grade == '고급' ? 'color: #8DF901;' : 'color: ;')"
        v-text="item.value.Name"
      ></v-list-item-subtitle>
    </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { IArmoryEquipment, IEquipment } from '../Requests';

const props = defineProps<{
    equipments?: Array<IEquipment>
    bg: string
}>();

function getQualityText(tooltip: string): string {
  for(let line of tooltip.split('\n')) {
    if(line.includes('qualityValue')) {
      let value = line.split(':')[1].split(',')[0];

      if(Number(value) == -1) {
        return '100';
      }

      return value;
    }
  }

  return '';
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