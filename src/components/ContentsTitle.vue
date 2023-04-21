<template>
  <div
    class="d-flex flex-wrap mx-auto"
  >
    <p
      :style="props.isBlack ? 'color: white;' : ''"
      class="text-h4 pb-6"
    >
      {{ props.title }}
    </p>
    <v-btn
      class="ml-2"
      :icon="icon"
      :color="props.isBlack ? 'white' : ''"
      variant="plain"
      :disabled="disabled"
      @click="onClickRefresh"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{
  title: string
  isBlack: boolean
}>();

const disabled = ref<boolean>(false);
const icon = ref<string>("mdi-refresh");

const emit = defineEmits<{
  (e: 'refresh'): void
}>();

const onClickRefresh = () => {
  emit('refresh');
  disabled.value = true;

  setTimeout(() => {
    disabled.value = false;
  }, 10000);
}

watch(()=> disabled.value, (newValue, oldValue) => {
  if(newValue) {
    icon.value = ''
  } else {
    icon.value = 'mdi-refresh'
  }
})

</script>