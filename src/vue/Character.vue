<template>
  <v-sheet
    class="pa-6 ma-2"
    style="background-color: #07080A;"
  >
    <template v-if="!search">
      <div
        id="character_input"
        class="pa-6 ma-2"
        style="background-color: #07080A;"
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
    </template>

    <template v-else>
      <ContentsTitle
        title="Profile"
        :is-black="true"
        @refresh="refreshCharactersInfo(characterName, true)"
      >
      </ContentsTitle>

      <div 
        id="default_profile"
        class="d-flex"
        style="background-color: #07080A;"
      >
        <CharacterDefaultProfile
          :data="profile"
          :bg="bgColor"
          :mainColor="props.mainColor"
          :dev="props.dev"
        ></CharacterDefaultProfile>

        <CharacterMainProfile
          :data="profile"
          :bg="bgColor"
          :mainColor="props.mainColor"
          :dev="props.dev"
        ></CharacterMainProfile>

      </div>
    </template>
</v-sheet>

</template>

<script setup lang="ts">
import ContentsTitle from '../components/ContentsTitle.vue'
import CharacterDefaultProfile from '../components/CharacterInfo/CharacterDefaultProfile.vue'
import CharacterMainProfile from '../components/CharacterInfo/CharacterMainProfile.vue'
import { onMounted, ref } from 'vue';
import type { ICharacterInfo, IProfile  } from '../Requests'
import { getCharactersSiblings, getArmoriesCharacters } from '../Requests'

const props = defineProps<{
  mainColor: string
  dev: boolean
}>();

const charactersInfo = ref<Array<ICharacterInfo>>();
const profile = ref<IProfile>();

const search = ref<boolean>(false);

const loading = ref<boolean>(false);
const characterName = ref<string>("");

// const bgColor = "#15181D";
const bgColor = "#292a2e";

const onClickSearch = async() => {
  search.value = true;

  loading.value = true;

  refreshCharactersInfo(characterName.value);

  loading.value = false;
}

const refreshCharactersInfo = async (name: string, force: boolean = false) => {
  charactersInfo.value = await getCharactersSiblings(name, force);
  console.log("chractersInfo: ", charactersInfo.value);

  profile.value = await getArmoriesCharacters(name, force);
  console.log("armoryProfile: ", profile.value);
}

onMounted(async () => {
  if(props.dev) {
    search.value = true;
    refreshCharactersInfo('데덴네귀여워', false);
  }
})

</script>