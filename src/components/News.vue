<template>
  <div
    id="NewsView"
    class="pa-6 ma-2"
  >
    <NewsList
      :main-color="props.mainColor"
      :items="news"
      @detail="onClickBrowser"
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
import NewsList from './NewsList.vue'
import EventList from './EventList.vue'
import { getNewsNotices, getNewsEvents, Notice, Event } from '../Requests'

const props = defineProps<{
  mainColor: string
}>();

const news = ref<Array<Notice>>();

const events = ref<Array<Event>>();

const dialog = ref<boolean>(false);
const vLink = ref<string>("");

const refresh = ref<boolean>(false);

const onClickBrowser = (link: string) => {
  dialog.value = true;
  vLink.value = link;
}


onMounted(async () => {
  news.value = await getNewsNotices();
  events.value = await getNewsEvents();
})

</script>