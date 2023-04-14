<template>
  <v-app>
    <v-main>
      <LogoBar
        :api-key="apiKey"
        :main-color="mainColor"
        @update-key="updateApiKeyValue"
        @update-mode="onChangeCurrentMenu"
        :menus="menus"
      ></LogoBar>

      <template v-if="current_menu=='NEWS'">
        <NewsVue
          :main-color="mainColor"
        ></NewsVue>
      </template>

      <template v-if="current_menu=='CHARACTERS'">
        <CharacterVue
          :main-color="mainColor"
        ></CharacterVue>
      </template>

      <template v-if="current_menu=='AUCTIONS'">
        <AuctionsVue
          :main-color="mainColor"
        ></AuctionsVue>
      </template>

      <template v-if="current_menu=='MARKETS'">
        <MarketsVue
          :main-color="mainColor"
        ></MarketsVue>
      </template>

      <template v-if="current_menu=='GAMECONTENTS'">
        <GameContentsVue
          :main-color="mainColor"
        ></GameContentsVue>
      </template>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import LogoBar from './components/LogoBar.vue'
import NewsVue from './vue/News.vue'
import CharacterVue from './vue/Character.vue'
import AuctionsVue from './vue/Auctions.vue'
import MarketsVue from './vue/Markets.vue'
import GameContentsVue from './vue/GameContents.vue'
import { setApiKey } from './Requests'

const apiKey = ref<string>("");

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

const current_menu = ref<string>("NEWS");

const updateApiKeyValue = (value: string) => {
  apiKey.value = value;
  localStorage.setItem('apiKey', apiKey.value);
  setApiKey(apiKey.value);
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

onBeforeMount(() => {
  loadApiKey();
})
</script>
