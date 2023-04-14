<template>
  <v-toolbar
    prominent
    :color="props.mainColor + '-lighten-5'"
  >
    <v-app-bar-nav-icon
      @click="show_navigation_drawer=true"
    >
    </v-app-bar-nav-icon>

    <v-btn icon>
      <v-img
        :src="icon"
        :height="height"
        :width="width"
        style="margin-left:10px"
        contain
      ></v-img>
    </v-btn>

    <v-toolbar-title>DedenneApp</v-toolbar-title>

    <v-toolbar-items
      width="600px"
    >
      <v-text-field
        class="shrink"
        v-model="apiKey"
        label="API Key"
        variant="underlined"
        :disabled="disabled"
        @update:model-value="checkCurrentButtonIcon"
      ></v-text-field>
      <v-btn
        :icon="icon_style"
        @click="onClickApplyAPIButton();"
      ></v-btn>
    </v-toolbar-items>
  </v-toolbar>

  <v-navigation-drawer
    v-model="show_navigation_drawer"
    disable-resize-watcher
    location="left"
    temporary
  >
    <v-list
    >
      <v-list-item
        :color="props.mainColor"
        title="Menu"
      ></v-list-item>
      <v-divider></v-divider>

      <v-list-item
        v-for="item in props.menus"
        :key="item.title"
        :value="item.key"
        :active-color="props.mainColor"
        @click="onClickSideMenu(item.key)"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>


</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import icon from '../assets/icon.png'

const props = defineProps<{
  apiKey: string
  mainColor: string
  menus: Array<{title:string, key:string}>
}>();

const emit = defineEmits<{
  (e: 'update-key', apiKey: string) :void,
  (e: 'update-mode', mode: string): void
}>();

const width = 32;
const height = 32;

const disabled = ref(false);
const icon_style = ref("mdi-pencil");

const show_navigation_drawer = ref(false);

const apiKey = ref<string>("");

const onClickApplyAPIButton = () => {
  if(apiKey.value.length > 0) {
    if(disabled.value) {
      disabled.value = false;
    } else {
      disabled.value = true;
      emit('update-key', apiKey.value);
    }
  }
  checkCurrentButtonIcon();
}

const checkCurrentButtonIcon = () => {
  if(disabled.value) {
    icon_style.value = "mdi-cog-outline"
  } else {
    if( apiKey.value.length == 0 ) {
      icon_style.value = "mdi-pencil"
    } else {
      icon_style.value = "mdi-check"
    }
  }
}

const onClickSideMenu = (item: string) => {
  emit('update-mode', item);
}

onMounted(() => {
  apiKey.value = props.apiKey;
  if(props.apiKey != "") {
    disabled.value = true;
  }
  checkCurrentButtonIcon();
})

</script>

<style scoped>
.v-text-field {
  width: 300px;
}
</style>