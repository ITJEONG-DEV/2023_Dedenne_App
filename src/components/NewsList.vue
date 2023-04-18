<template>
  <ContentsTitle
    title="News"
    @refresh="emit('refresh');"
  >
  </ContentsTitle>

  <v-sheet
    class="justify-center flex-wrap mx-auto"
  >
    <v-list
      lines="one"
    >
      <v-list-item
        v-for="item in currentItem"
          :key="item.Link"
          class="mx-auto"
      >
        <v-list-item-title>
          [{{ item.Type }}] {{ item.Title }}
          <v-btn
            variant="text"
            :color="props.mainColor+'-darken-4'"
            @click="emit('detail', item.Link);"
          >
            더보기
          </v-btn>
        </v-list-item-title>
        <v-divider></v-divider>
      </v-list-item>

      <v-card-actions
        class="justify-center"
      >
        <v-btn
          icon="mdi-page-first"
          @click="onClickFirstPage();"
        ></v-btn>

        <v-btn
          icon="mdi-chevron-left"
          @click="onClickPreviousPage();"
        ></v-btn>

        <v-btn>
          {{ pageNumber + 1 }}
        </v-btn>

        <v-btn
          icon="mdi-chevron-right"
          @click="onClickNextPage();"
        ></v-btn>

        <v-btn
          icon="mdi-page-last"
          @click="onClickLastPage();"
        ></v-btn>
      </v-card-actions>
    </v-list>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';
import ContentsTitle from './ContentsTitle.vue'
import { INotice } from '../Requests'

const props = defineProps<{
  mainColor: string,
  items?: Array<INotice>
}>();

const emit = defineEmits<{
  (e: 'detail', link: string): void
  (e: 'refresh'): void
}>();

const pageNumber = ref<number>(0);
const currentItem = shallowRef<Array<INotice>>();

watch(() => props.items, (newValue, oldValue) => {
  currentItem.value = props.items?.slice(pageNumber.value*5, (pageNumber.value+1)*5)
})

watch(() => pageNumber.value, (newValue, oldValue) => {
  currentItem.value = props.items?.slice(pageNumber.value*5, (pageNumber.value+1)*5)
})

const onClickFirstPage = () => {
  pageNumber.value = 0;
}

const onClickPreviousPage = () => {
  if(!props.items) {
    pageNumber.value = 0;
  } else {
    pageNumber.value--;

    if(pageNumber.value < 0) {
      pageNumber.value = 0;
    }
  }
}

const onClickNextPage = () => {
  if(!props.items) {
    pageNumber.value = 0;
  } else {
    pageNumber.value +=1;

    if(pageNumber.value > Math.floor(props.items?.length/5)) {
      pageNumber.value = Math.floor(props.items?.length/5);
    }
  }
}

const onClickLastPage = () => {
  if(!props.items) {
    pageNumber.value = 0;
  } else {
    pageNumber.value = Math.floor(props.items?.length/5);
  }
}

onMounted(() => {
  onClickFirstPage();
})

</script>