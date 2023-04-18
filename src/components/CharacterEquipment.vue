<template>
  <v-list
  >
    <v-list-item
      v-for="item in props.equipments"
      :key="item.Name"
      class="d-flex"
    >
      <template v-slot:prepend>
        <template v-if="item.Grade == '전설'">
          <v-card
            variant="outlined"
            class="mr-2 legend"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '유물' && item.Type == '팔찌'">
          <v-card
            variant="outlined"
            class="mr-2 artifact"
            width="32px"
            height="32px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '유물'">
          <v-card
            variant="outlined"
            class="mr-2 artifact"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '고대' && item.Type == '팔찌'">
          <v-card
            variant="outlined"
            class="mr-2 ancient"
            width="32px"
            height="32px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-else-if="item.Grade == '고대'">
          <v-card
            variant="outlined"
            class="mr-2 ancient"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-else>
          <v-card
            variant="outlined"
            class="mr-2 default"
            width="32px"
            height="36px"
          >
            <v-img
              :src="item.Icon"
              width="32px"
              height="32px"
            ></v-img>
          </v-card>
        </template>

        <template v-if="item.Type=='어빌리티 스톤'">
          <v-card
            variant="outlined"
            class="ma-0 pa-0"
            width="32px"
            height="16px"
            style="position:absolute; top: 36px; background-color: white; font-size:10px; font-weight:bold; text-align:center;"
          >
            {{ getAbilitystoneText(item.Tooltip) }}
          </v-card> 
        </template>

        <template v-else-if="item.Type=='팔찌'">
        </template>
        
        <template v-else>
          <v-card
            variant="outlined"
            class="ma-0 pa-0"
            width="32px"
            height="16px"
            style="position:absolute; top: 36px; background-color: white; font-size:10px; font-weight:bold; text-align:center;"
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