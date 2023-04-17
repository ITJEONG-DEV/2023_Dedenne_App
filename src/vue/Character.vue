<template>
  <div
    id="character_input"
    class="pa-6 ma-2"
  >
    <v-text-field
      v-model="characterName"
      :loading="loading"
      density="compact"
      variant="solo"
      label="캐릭터명 입력"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      @click:append-inner="onClickSearch()"
    ></v-text-field>
  </div>

  <div id="default_profile">
  </div>

  <div id="select">
  </div>

  <div id="">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCharactersSiblings, CharacterInfo } from '../Requests'

const props = defineProps<{
  mainColor: string
}>();

const charactersInfo = ref<Array<CharacterInfo>>();

const loading = ref<boolean>(false);
const characterName = ref<string>("");

const info_list = [
  { title : "전투", key:"BATTLE"}, // 장비, 품질, 세트효과, 장신구, 각인효과, 카드, 보석
  { title : "아바타", key:"AVARTARS"}, // 아바타
  { title : "내실", key : "AUCTIONS"}, // 내실장비
  { title : "스킬", key : "SKILLS"},
]
const current_selection = "기본"

const onClickSearch = async() => {
  loading.value = true;

  refreshCharactersInfo(characterName.value);

  loading.value = false;
}

const refreshCharactersInfo = async (name: string, force: boolean = false) => {
  charactersInfo.value = await getCharactersSiblings(name, force);

  console.log(charactersInfo.value);
}

onMounted(async () => {
})

</script>