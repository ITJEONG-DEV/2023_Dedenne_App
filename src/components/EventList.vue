<template>

<p class="text-h4">Events</p>

  <v-sheet
    class="justify-center flex-wrap mx-auto"
  >
    <v-card
      v-for="item in props.current_items"
        :key="item.Link"
        class="mx-auto"
    >

      <v-card-text>
        [{{ item.Type }}] {{ item.Title }}

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
import { Notice } from '../Requests'

const props = defineProps<{
  mainColor: string,
  current_items?: Array<Notice>
}>();

const emit = defineEmits<{
  (e: 'detail', link: string): void
}>();

</script>