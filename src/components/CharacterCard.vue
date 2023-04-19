<template>
  <v-sheet>
    <v-list
      class="d-flex ma-1 pa-0"
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
        {{ props.card?.Effects.slice(-1)[0].Items.slice(-1)[0].Name }}
      </v-list-item-title>
      <!-- <v-list-item-subtitle>{{ props.card?.Effects.slice(-1)[0].Items.slice(-1)[0].Description }}</v-list-item-subtitle> -->
    </v-list-item>

    <!-- <v-list
      v-for="effect in props.card?.Effects"
      :key="effect.Index"
    >
      <v-list-item
        v-for="item in effect.Items"
        :key="item.Name"
      >
        <v-list-item-title>{{ item.Name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.Description }}</v-list-item-subtitle>
      </v-list-item>
    </v-list> -->
  </v-sheet>
</template>

<script setup lang="ts">
import type { IArmoryCard } from '../Requests';
import border_gold from '../assets/img_card_grade_gold.png'
import border_purple from '../assets/img_card_grade_purple.png'
import border_blue from '../assets/img_card_grade_blue.png'
import border_green from '../assets/img_card_grade_green.png'
import border_gray from '../assets/img_card_grade_gray.png'

const props = defineProps<{
    card?: IArmoryCard
}>();

</script>