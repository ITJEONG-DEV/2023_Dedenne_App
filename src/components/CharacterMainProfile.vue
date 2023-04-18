<template>
  <v-sheet
    class="justify-center ma-2 px-4"
  >
    <v-list
      class="d-flex ma-0 mb-5 pa-0"
      border
    >
      <v-list-item
        v-for="item in menu_list"
        :key="item.key"
        :value="item.value"
        :active-color="props.mainColor"
        @click="onClickMenu(item.key)"
      >
        <v-list-item-title>{{ item.value }}</v-list-item-title>
      </v-list-item>
    </v-list>
    
    <template v-if="current_menu == 'battle'">
      <v-card
        class="d-flex"
        color="#15181D"
        min-width="1030px"
        min-height="550px"
      >
        <div>
          <div
            id="equipment"
            class="d-flex"
          >
            <CharacterEquipmentVue
              :equipments="equipments"
              width="330px"
              height="360px"
              border
            ></CharacterEquipmentVue>

            <CharacterEquipmentVue
              :equipments="accessories"
              width="270px"
              height="360px"
              border
            ></CharacterEquipmentVue>
          </div>

          <div
            id="engraving"
          >
            <CharacterEngraving
              :engraving="props.data?.ArmoryEngraving"
              width="600px"
              height="190px"
              border
            ></CharacterEngraving>
          </div>

        </div>

        <v-card>
          <CharacterGemVue
            id="gem"
            :gems="props.data?.ArmoryGem"
            width="450px"
            height="150px"
            border
          ></CharacterGemVue>

          <CharacterCardVue
            id="card"
            :card="props.data?.ArmoryCard"
            width="450px"
            height="400px"
            border
          ></CharacterCardVue>
        </v-card>
      </v-card>
    </template>

    <template v-if="current_menu == 'collectible'">
      <v-card
        class="d-flex"
        color="#15181D"
        min-width="1030px"
        min-height="550px"
      >

      </v-card>

    </template>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IProfile, IArmoryEquipment } from '../Requests'
import CharacterEquipmentVue from './CharacterEquipment.vue'
import CharacterGemVue from './CharacterGem.vue'
import CharacterCardVue from './CharacterCard.vue'
import CharacterEngraving from './CharacterEngraving.vue'

const props = defineProps<{
  data?: IProfile
  mainColor: string
}>();

const equipments = ref<Array<IArmoryEquipment>>();
const accessories = ref<Array<IArmoryEquipment>>();
const stone = ref<IArmoryEquipment>();
const bracelet = ref<IArmoryEquipment>();

const menu_list = [
  { value: "전투", key: "battle"},
  { value: "내실", key: "collectible"}
]

const current_menu = ref<string>("battle")

const onClickMenu = (key: string) => {
  current_menu.value = key;
}

watch(() => props.data?.ArmoryEquipment, (newValue, oldValue) => {
  if(props.data == null) return;

  // equipments
  equipments.value = [];
  for(var i=1; i<6; i++) {
    equipments.value.push(props.data.ArmoryEquipment[i]);
  }
  equipments.value.push(props.data.ArmoryEquipment[0]);

  // accessories
  accessories.value = [];
  for(var i=6; i<11; i++) {
    accessories.value.push(props.data.ArmoryEquipment[i]);
  }
  accessories.value.push(props.data.ArmoryEquipment[11]);
  accessories.value.push(props.data.ArmoryEquipment[12]);

  // stone
  stone.value = props.data.ArmoryEquipment[11];

  // bracelet
  bracelet.value = props.data.ArmoryEquipment[12];
})

</script>