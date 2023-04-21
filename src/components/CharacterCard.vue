<template>
  <v-sheet
    :color="props.bg"
  >
    <v-list
      class="d-flex ma-1 pa-0"
      :style="'background-color: '+ props.bg + ';'"
    >
      <v-list-item
        class="ma-0 px-1"
        v-for="item in props.card?.Cards"
        :key="item.Icon"
      >
        <v-card
        variant="tonal"
          class="pa-0 ma-0"
          width="90px"
          height="130px"  
        >
          <template v-if="item.Grade == '전설'">
            <img
              style="position:absolute;  z-index: 2;"
              class="centered-and-cropped"
              :src="border_gold"
            />
          </template>
          <template v-else-if="item.Grade == '영웅'">
            <img
              style="position:absolute;  z-index: 2;"
              class="centered-and-cropped"
              :src="border_purple"
            />
          </template>
          <template v-else-if="item.Grade == '희귀'">
            <img
              style="position:absolute;  z-index: 2;"
              class="centered-and-cropped"
              :src="border_blue"
            />
          </template>
          <template v-else-if="item.Grade == '고급'">
            <img
              style="position:absolute;  z-index: 2;"
              class="centered-and-cropped"
              :src="border_green"
            />
          </template>
          <template v-else>
            <img
              style="position:absolute; z-index: 2; left: -1px;"
              class="centered-and-cropped"
              :src="border_gray"
            />
          </template>
          <v-img
            :src="item.Icon"
          >
          </v-img>
        </v-card>
        <v-list-item-subtitle :v-text="item.Name"></v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-list-item>
      <v-list-item-title
        style="color: rgb(199, 170, 0); font-weight:bold;"
      >
        {{ effect }}
      </v-list-item-title>
    </v-list-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { IArmoryCard, ICardEffect } from '../Requests';
import border_gold from '../assets/img_card_grade_gold.png'
import border_purple from '../assets/img_card_grade_purple.png'
import border_blue from '../assets/img_card_grade_blue.png'
import border_green from '../assets/img_card_grade_green.png'
import border_gray from '../assets/img_card_grade_gray.png'

const props = defineProps<{
    card?: IArmoryCard
    bg: string
}>();

const effect = ref<string>("");

const getMaxEffect = (list: ICardEffect[]) => {
  list.sort((a: ICardEffect, b: ICardEffect) => {
    return - (a.Items.length - b.Items.length); 
  })

  return list[0].Items.slice(-1)[0].Name;
}

const getEffect = () => {
  if(props.card == null || props.card.Effects.length == 0) {
    return "";
  } else {
    return getMaxEffect(props.card.Effects);
  }
}


watch(() => props.card, (first, second) => {
  effect.value = getEffect()
})


</script>