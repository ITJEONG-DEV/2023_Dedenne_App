<template>
  <ContentsTitle
    title="Events"
    :is-black="false"
    @refresh="emit('refresh');"
  >
  </ContentsTitle>

  <v-sheet
    class="d-flex justify-center flex-wrap mx-auto"
  >
    <v-card
      width="30%"
      v-for="item in props.current_items"
        :key="item.Link"
        class="mx-auto ma-2"
    >
      <template v-if="!props.dev">
        <v-img
          :src="item.Thumbnail"
          width="100%"
        ></v-img>
      </template>
      
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
import ContentsTitle from '../ContentsTitle.vue'
import { IEvent } from '../../Requests'

const props = defineProps<{
  mainColor: string,
  current_items?: Array<IEvent>
  dev: boolean
}>();

const emit = defineEmits<{
  (e: 'detail', link: string): void
  (e: 'refresh'): void
}>();

</script>