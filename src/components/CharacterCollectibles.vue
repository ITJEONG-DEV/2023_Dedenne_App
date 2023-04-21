<template>
  <v-sheet
    :style="'background: ' + props.bg + ';'"
    width="1050px"
    class="pa-0 ma-0"
  >
    <template v-if="props.collectibles != null">
      <v-row 
        class="ma-0 px-0"
        v-for="i in [0, 1]"
        :key="i"
      >
        <v-col cols="3"
          class="ma-0 pa-0"
          v-for="j in [0, 1, 2, 3]"
          :key="j"
        >
          <v-list-item
            class="pt-1"
            height="50px"
            :active-color="props.mainColor"
            :active="isActive(props.collectibles[i*4+j].Type)"
            @click="onClickMenu(props.collectibles[i*4+j].Type)"
            border
          >
            <template v-slot:prepend>
              <v-avatar
                class="mr-3 pa-0"
              >
                <v-img
                  cover
                  :src="props.collectibles[i*4+j].Icon"
                ></v-img>
              </v-avatar>        
            </template>
            <div>
              <v-list-item-title
                style="font-weight: bold; color: white;"
              >
                {{ props.collectibles[i*4+j].Type }}
              </v-list-item-title>

              <v-list-item-subtitle
                style="font-weight: bold; color: white;"
              >
                {{ getCollectibleText(i*4+j) }}
              </v-list-item-subtitle>
            </div>
          </v-list-item>

        </v-col>
      </v-row>

      <template v-if="current_collectible == '모코코 씨앗'">
        <PointMokokoVue
          width="1050px"
          height="450px"
        ></PointMokokoVue>
      </template>

      <template v-else-if="current_collectible == '섬의 마음'">
        <PointIslandVue
          width="1050px"
          height="450px"
        ></PointIslandVue>
      </template>

      <template v-else-if="current_collectible == '위대한 미술품'">
        <PointGreatPictureVue
          width="1050px"
          height="450px"
        ></PointGreatPictureVue>
      </template>

      <template v-else-if="current_collectible == '거인의 심장'">
        <PointGiantHeartsVue
          width="1050px"
          height="450px"
        ></PointGiantHeartsVue>
      </template>

      <template v-else-if="current_collectible == '이그네아의 징표'">
        <PointAdventureMedalVue
          width="1050px"
          height="450px"
        ></PointAdventureMedalVue>
      </template>

      <template v-else-if="current_collectible == '항해 모험물'">
        <PointVoyageVue
          width="1050px"
          height="450px"
        ></PointVoyageVue>
      </template>

      <template v-else-if="current_collectible == '세계수의 잎'">
        <PointWorldtreeVue
          width="1050px"
          height="450px"
        ></PointWorldtreeVue>
      </template>

      <template v-else-if="current_collectible == '오르페우스의 별'">
        <PointOrpeusStarVue
          width="1050px"
          height="450px"
        ></PointOrpeusStarVue>
      </template>

      <template v-else-if="current_collectible == '기억의 오르골'">
        <PointOrgelVue
          width="1050px"
          height="450px"
        ></PointOrgelVue>
      </template>

    </template>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ICollectible } from '../Requests'
import PointMokokoVue from './Collectibles/PointMokoko.vue'
import PointIslandVue from './Collectibles/PointIsland.vue'
import PointGreatPictureVue from './Collectibles/PointGreatPicture.vue'
import PointGiantHeartsVue from './Collectibles/PointGiantHearts.vue'
import PointAdventureMedalVue from './Collectibles/PointAdventureMedal.vue'
import PointVoyageVue from './Collectibles/PointVoyage.vue'
import PointWorldtreeVue from './Collectibles/PointWorldtree.vue'
import PointOrpeusStarVue from './Collectibles/PointOrpeusStar.vue'
import PointOrgelVue from './Collectibles/PointOrgel.vue'

const props = defineProps<{
  collectibles?: Array<ICollectible>
  mainColor: string
  bg: string
}>();

const current_collectible = ref<string>("모코코 씨앗");

const onClickMenu = (type: string) => {
  current_collectible.value = type;
}

const isActive = (key: string) => {
  if(current_collectible.value == key) {
    return true;
  } else {
    return false;
  }
}

const getCollectibleText = (index: number) => {
  if(props.collectibles == null) {
    return "";
  }

  let item = props.collectibles[index];

  return item.Point + " / " + item.MaxPoint + " (" + Math.floor(item.Point/item.MaxPoint * 100) + "%)";
}

</script>