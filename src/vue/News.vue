<template>
  <div
    id="NewsView"
    class="pa-6 ma-2"
  >
    <NewsList
      :main-color="props.mainColor"
      :items="news"
      @detail="onClickBrowser"
      @refresh="refreshNews(true);"
    ></NewsList>
  </div>

  <div
    id="EventsView"
    class="pa-6 ma-2"
  >
    <EventList
      :main-color="props.mainColor"
      :current_items="events"
      @detail="onClickBrowser"
      @refresh="refreshEvent(true);"
      :dev="props.dev"
    ></EventList>
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
import { onMounted, ref } from 'vue';
import NewsList from '../components/News/NewsList.vue'
import EventList from '../components/News/EventList.vue'
import type { INotice, IEvent } from '../Requests'
import { getNewsNotices, getNewsEvents } from '../Requests'

const props = defineProps<{
  mainColor: string
  dev: boolean
}>();

const news = ref<Array<INotice>>();

const events = ref<Array<IEvent>>();

const dialog = ref<boolean>(false);
const vLink = ref<string>("");

const onClickBrowser = (link: string) => {
  dialog.value = true;
  vLink.value = link;
}

const refreshNews = async (force: boolean = false) => {
  news.value = await getNewsNotices(force);
}

const refreshEvent = async (force: boolean = false) => {
  events.value = await getNewsEvents(force);
}

onMounted(async () => {
  refreshNews();
  refreshEvent();
})

</script>