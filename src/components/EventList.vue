<template>

<p class="text-h4 pb-6">Events</p>

  <v-sheet
    class="d-flex justify-center flex-wrap mx-auto"
  >
    <v-card
      width="30%"
      v-for="item in props.current_items"
        :key="item.Link"
        class="mx-auto ma-2"
    >

      <!-- <v-img
        :src="item.Thumbnail"
        width="100%"
      ></v-img> -->

      <v-card-text>
        {{ item.Title }}

        <v-btn
          variant="text"
          :color="props.mainColor+'-darken-4'"
          @click="emit('detail', item.Link);"
        >
          더보기
        </v-btn>
      </v-card-text>

    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { Event } from '../Requests'

const props = defineProps<{
  mainColor: string,
  current_items?: Array<Event>
}>();

const emit = defineEmits<{
  (e: 'detail', link: string): void
}>();

</script>