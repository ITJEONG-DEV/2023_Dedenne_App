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
          width="62px"
          height="90px"
        >
          <v-img
            cover
            style="position:absolute;  z-index: 2;"
            :class="item.Grade == '전설' ? 'centered-and-cropped-gold' : item.Grade == '영웅' ? 'centered-and-cropped-purple' : item.Grade == '희귀' ? 'centered-and-cropped-blue' : item.Grade == '고급' ? 'centered-and-cropped-green' : 'centered-and-cropped-gray'"
            src="https://cdn-lostark.iloa.gg/2018/obt/assets/images/pc/profile/img_card_grade.png"
          >
          </v-img>
          <v-img
            cover
            :src="item.Icon"
          >
          </v-img>
        </v-card>
        <v-list-item-subtitle :v-text="item.Name"></v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-list
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
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import type { IArmoryCard } from '../Requests';

const props = defineProps<{
    card?: IArmoryCard
}>();

</script>