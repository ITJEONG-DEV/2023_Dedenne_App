<template>
  <v-app>
    <v-main>
      <LogoBar
        :api-key="apiKey"
        :main-color="mainColor"
        @update-key="updateApiKeyValue"
        @update-mode="onChangeCurrentMenu"
        :menus="menus"
        :current_menu="current_menu"
      ></LogoBar>

      <template v-if="current_menu=='NEWS'">
        <NewsVue
          :main-color="mainColor"
          :dev="dev"
        ></NewsVue>
      </template>

      <template v-if="current_menu=='CHARACTERS'">
        <CharacterVue
          :main-color="mainColor"
          :dev="dev"
        ></CharacterVue>
      </template>

      <template v-if="current_menu=='AUCTIONS'">
        <AuctionsVue
          :main-color="mainColor"
          :dev="dev"
        ></AuctionsVue>
      </template>

      <template v-if="current_menu=='MARKETS'">
        <MarketsVue
          :main-color="mainColor"
          :dev="dev"
        ></MarketsVue>
      </template>

      <template v-if="current_menu=='GAMECONTENTS'">
        <GameContentsVue
          :main-color="mainColor"
          :dev="dev"
        ></GameContentsVue>
      </template>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref, watch } from 'vue'
import LogoBar from './components/LogoBar.vue'
import NewsVue from './vue/News.vue'
import CharacterVue from './vue/Character.vue'
import AuctionsVue from './vue/Auctions.vue'
import MarketsVue from './vue/Markets.vue'
import GameContentsVue from './vue/GameContents.vue'
import { setApiKey } from './Requests'

const apiKey = ref<string>("");
const dev = true;

// red pink purple
// deep-purple indigo blue
// light-blue cyan teal
// green light-green lime
// yellow amber orange
// deep-oragne brown blue-gray
// grey shades

const mainColor = "orange"

const menus = [
  { title : "소식", key:"NEWS"},
  { title : "캐릭터 정보", key:"CHARACTERS"},
  { title : "경매장", key : "AUCTIONS"},
  { title : "상점", key : "MARKETS"},
  { title : "컨텐츠", key : "GAMECONTENTS"},
]

const current_menu = ref<string>("CHARACTERS");

const updateApiKeyValue = (value: string) => {
  apiKey.value = value;
}

const loadApiKey = () => {
  var result = localStorage.getItem('apiKey')

  if(result != null) {
    apiKey.value = result;
    setApiKey(apiKey.value);
  } else {
    console.log("apiKey is null")
  }
}

const onChangeCurrentMenu = (menu: string) => {
  current_menu.value = menu;
}

watch(() => apiKey.value, (newValue, oldValue) => {
  localStorage.setItem('apiKey', apiKey.value);
  setApiKey(apiKey.value);
})


onBeforeMount(() => {
  loadApiKey();
})
</script>

<style>

/* card for crop */
.centered-and-cropped {
  padding: 1px;
  top: 0px;
  left: 0px;
  width: 90px;
  height: 130px;
  object-fit: cover;
}

/* 품질별 색상 */
.quality_0 {
  color: rgb(255, 0, 0);
}

.quality_0_bg {
  background: rgb(255, 0, 0);
}

.quality_10 {
  color: rgb(167, 147, 0);
}

.quality_10_bg {
  background: rgb(167, 147, 0);
}

.quality_30 {
  color: rgb(9, 174, 9);
}

.quality_30_bg {
  background: rgb(9, 174, 9);
}

.quality_70 {
  color: rgb(18, 96, 235);
}
.quality_70_bg {
  background: rgb(18, 96, 235);
}

.quality_90 {
  color: rgb(223, 24, 227);
}
.quality_90_bg {
  background: rgb(223, 24, 227);
}

.quality_100 {
  color: rgb(234, 104, 17);
}
.quality_100_bg {
  background: rgb(234, 104, 17);
}


/* default */
.none_bg {
  background: rgb(100, 100, 100);
}

.default_bg {
  background: rgb(48,48,48);
}

/* 전설 */
.legend_bg {
  background: rgb(158,95,4);
  background: linear-gradient(135deg, rgba(54,32,3,0.8) 0%, rgba(158,95,4,1) 70%);
}

/* 유물 */
.artifact_bg {
  background: rgb(162,64,6);
  background: linear-gradient(135deg, rgba(52,26,9,0.8) 0%, rgba(162,64,6,1) 70%);
}

/* 고대 */
.ancient_bg {
  background: rgb(220,201,153);
  background: linear-gradient(135deg, rgba(61,51,37,0.8) 0%, rgba(220,201,153,1) 70%);
}
</style>