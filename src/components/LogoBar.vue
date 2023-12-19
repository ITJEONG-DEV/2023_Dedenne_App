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
        :active="isActive(item.key)"
        @click="onClickSideMenu(item.key)"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog
    v-model="show_dialog"
    width="500px"
    height="500px"
  >
    <v-card
      class="pa-2"
    >
      <v-card-title
        :color="props.mainColor + '-lighten-5'"
      >API Key 입력</v-card-title>
      <div
        class="d-flex ma-4"
      >
        <v-text-field
          class="shrink"
          v-model="apiKey"
          label="API Key"
          variant="underlined"
        ></v-text-field>
        <v-btn
          :icon="icon_style"
          @click="onClickApplyAPIButton();"
        ></v-btn>
      </div>

      <v-card-actions>
        <v-btn
          href="https://developer-lostark.game.onstove.com/clients"
          target="_blank"
        >
          API Key 발급하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import icon from '../assets/icon.png'

const props = defineProps<{
  apiKey: string
  mainColor: string
  menus: Array<{title:string, key:string}>
  current_menu: string
}>();

const emit = defineEmits<{
  (e: 'update-key', apiKey: string) :void,
  (e: 'update-mode', mode: string): void
}>();

const width = 32;
const height = 32;

const disabled = ref(false);
const icon_style = ref("mdi-pencil");

const show_navigation_drawer = ref<boolean>(false);
const show_dialog = ref<boolean>(true);

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
  show_navigation_drawer.value = false;
}

const isActive = (key: string) => {
  if(props.current_menu == key) {
    return true;
  } else {
    return false;
  }
}

onMounted(() => {
  apiKey.value = props.apiKey;
  if(props.apiKey != "") {
    disabled.value = true;
    show_dialog.value = false;
  }
  checkCurrentButtonIcon();
})

</script>

<style scoped>
.v-text-field {
  width: 300px;
}
</style>