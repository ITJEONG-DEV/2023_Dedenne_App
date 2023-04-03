<template>
    <v-toolbar
      prominent
    >
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-side-icon>
        <v-img
          :src="icon"
          :height="height"
          :width="width"
          style="margin-left:10px"
          contain
        />
      </v-toolbar-side-icon>

      <v-toolbar-title>DedenneApp</v-toolbar-title>

      <v-toolbar-items
        width="600px"
      >
        <v-text-field
          class="shrink"
          v-model="api"
          label="API Key"
          variant="underlined"
          :disabled="disabled"
          @update:model-value="checkCurrentButtonIcon"
        ></v-text-field>
        <v-btn
          :icon="icon_style"
          @click="onClickApplyAPIButton"
        ></v-btn>
      </v-toolbar-items>
</v-toolbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import icon from '../assets/icon.png'

const width = 32;
const height = 32;

const api = ref("");
const disabled = ref(false);
const icon_style = ref("mdi-pencil");

const changeIconStyle = () => {
  if(disabled) {
    icon_style.value = "mdi-check"
  } else {
    icon_style.value = "mdi-pencil";
  }
}

const onClickApplyAPIButton = () => {
  if(disabled.value) {
    disabled.value = false;
  } else {
    disabled.value = true;
    console.log(api.value)
  }
  checkCurrentButtonIcon();
}

const checkCurrentButtonIcon = () => {
  if(disabled.value) {
    icon_style.value = "mdi-cog-outline"
  } else {
    if( api.value.length == 0 ) {
      icon_style.value = "mdi-pencil"
    } else {
      icon_style.value = "mdi-check"
    }
  }
}

onMounted(() => {
  checkCurrentButtonIcon();
})

</script>

<style scoped>
.v-text-field {
  width: 300px;
}
</style>