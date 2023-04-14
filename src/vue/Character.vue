<template>
  <v-btn
    :color="mainColor"
  >
    character vue
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
  mainColor: string
}>();
</script>