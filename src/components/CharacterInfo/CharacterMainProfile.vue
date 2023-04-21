<template>
  <v-sheet
    class="justify-center my-2 px-2"
    style="background-color: #07080A;"
  >
    <v-list
      class="d-flex ma-0 mb-4 pa-0"
      :style="'background-color: ' + props.bg + ';'"
      border
    >
      <v-list-item
        height="50px"
        v-for="item in menu_list"
        :key="item.key"
        :value="item.value"
        :active-color="props.mainColor"
        :active="isActive(item.key)"
        @click="onClickMenu(item.key)"
      >
        <v-list-item-title
          :style="'font-weight: bold; color: white;'"
        >
          {{ item.value }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    
    <template v-if="current_menu == 'battle'">
      <v-card
        class="d-flex"
        :color="props.bg"
        width="1050px"
        min-height="550px"
      >
        <div>
          <div
            id="equipment"
            class="d-flex"
          >
            <CharacterEquipmentVue
              :equipments="equipments"
              :bg="props.bg"
              :dev="props.dev"
              width="330px"
              height="360px"
              border
            ></CharacterEquipmentVue>

            <CharacterEquipmentVue
              :equipments="accessories"
              :bg="props.bg"
              :dev="props.dev"
              width="270px"
              height="360px"
              border
            ></CharacterEquipmentVue>
          </div>

          <div>
            <CharacterCardVue
              id="card"
              :card="props.data?.ArmoryCard"
              :bg="props.bg"
              :dev="props.dev"
              width="600px"
              height="190px"
              border
            ></CharacterCardVue>
          </div>

        </div>

        <v-card>
          <CharacterEngraving
            id="engraving"
            :engraving="props.data?.ArmoryEngraving"
            :bg="props.bg"
            :dev="props.dev"
            width="450px"
            height="400px"
            border
          ></CharacterEngraving>

          <CharacterGemVue
            id="gem"
            :gems="props.data?.ArmoryGem"
            :bg="props.bg"
            :dev="props.dev"
            width="450px"
            height="150px"
            border
          ></CharacterGemVue>

        </v-card>
      </v-card>
    </template>

    <template v-if="current_menu == 'collectible'">
      <v-card
        class="d-flex"
        :color="props.bg"
        width="1050px"
        min-height="550px"
      >
        <CharacterCollectibles
          :collectibles="data?.Collectibles"
          :main-color="props.mainColor"
          :bg="props.bg"
          :dev="props.dev"
        ></CharacterCollectibles>

      </v-card>

    </template>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { IProfile, IArmoryEquipment, IEquipment } from '../../Requests'
import CharacterEquipmentVue from './CharacterEquipment.vue'
import CharacterGemVue from './CharacterGem.vue'
import CharacterCardVue from './CharacterCard.vue'
import CharacterEngraving from './CharacterEngraving.vue'
import CharacterCollectibles from './CharacterCollectibles.vue'

const props = defineProps<{
  data?: IProfile
  mainColor: string
  bg: string
  dev: boolean
}>();

const equipments = ref<Array<IEquipment>>();
const accessories = ref<Array<IEquipment>>();
const stone = ref<IArmoryEquipment>();
const bracelet = ref<IArmoryEquipment>();

const menu_list = [
  { value: "전투", key: "battle"},
  { value : "아바타", key:"avatars"},
  { value: "내실", key: "collectible"}
]

const current_menu = ref<string>("collectible")

const onClickMenu = (key: string) => {
  current_menu.value = key;
}

const isActive = (key: string) => {
  if(current_menu.value == key) {
    return true;
  } else {
    return false;
  }
}

watch(() => props.data?.ArmoryEquipment, (newValue, oldValue) => {
  if(props.data == null) return;
  if(props.data.ArmoryEquipment.length == 0) return;

  equipments.value = Array<IEquipment>();
  accessories.value = Array<IEquipment>();

  let equipment_sequence = ['무기', '투구', '상의', '하의', '장갑', '어깨', '목걸이', '귀걸이', '귀걸이', '반지', '반지', '어빌리티 스톤', '팔찌']

  let index = 0;
  let weapon: IArmoryEquipment | null = null;
  for(var i=0; i<props.data.ArmoryEquipment.length; i++) {
    var item = props.data.ArmoryEquipment[i];

    while(item.Type == equipment_sequence[index]) {
      if(item.Type == equipment_sequence[index]) {
        break;
      }

      if(index == 0) {
        weapon = null;
      } else if(index < 6) {
        equipments.value.push({name: equipment_sequence[index], value: null})
      } else {
        accessories.value.push({name: equipment_sequence[index], value: null})
      }

      index++;


      if(index > equipment_sequence.length) {
        break;
      }
    }

    if(index > equipment_sequence.length) {
      break;
    }


    if(item.Type == '무기') {
      weapon = item;
    }
    else if(['투구', '상의', '하의', '장갑', '어깨'].includes(item.Type)) {
      equipments.value.push({name: item.Type, value: item});
    }

    else if(['목걸이', '귀걸이', '반지', '팔찌', '어빌리티 스톤'].includes(item.Type)) {
      if(item.Type == '팔찌') {
        bracelet.value = item;
      } else if (item.Type == '어빌리티 스톤') {
        stone.value = item;
      }

      accessories.value.push({name: item.Type, value: item});
    }
  }

  if(weapon == null) {
    equipments.value.push({name: '무기', value: null});
  } else {
    equipments.value.push({name: weapon.Type, value: weapon});
  }
})

</script>