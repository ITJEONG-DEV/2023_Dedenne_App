<template>

  <div id="NewsView">
    <NewsList
      :main-color="props.mainColor"
      :current_items="current_news"
    ></NewsList>
  </div>

  <v-dialog
    v-model="dialog"
    width="80vw"
    overlay-color="white"
    overlay-opacity="1"
  >
    <v-btn
      :color="props.mainColor+'-lighten-3'"
      @click="dialog=false"
    >
      close
    </v-btn>
    <iframe
      style="height: 800px; background: #ffffff"
      :src="vLink"
    ></iframe>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import NewsList from './NewsList.vue'
import { getNewsNotices, Notice } from '../Requests'

const props = defineProps<{
  mainColor: string
}>();

const news = ref<Array<Notice>>();
const current_news = shallowRef<Array<Notice>>();

const dialog = ref<boolean>(false);
const vLink = ref<string>("");

const onClickBrowser = (link: string) => {
  dialog.value = true;
  vLink.value = link;
}


onMounted(async () => {
  news.value = await getNewsNotices();
  current_news.value = news.value.slice(0, 5);
})

</script>