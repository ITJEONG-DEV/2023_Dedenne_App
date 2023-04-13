<template>
  <v-app>
    <v-main>
      <LogoBar
        :api-key="apiKey"
        :main-color="mainColor"
        @update="updateApiKeyValue"
      ></LogoBar>
      <News
        :main-color="mainColor"
      ></News>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import LogoBar from './components/LogoBar.vue'
import News from './components/News.vue'
import { setApiKey } from './Requests'

const apiKey = ref<string>("");

// red pink purple
// deep-purple indigo blue
// light-blue cyan teal
// green light-green lime
// yellow amber orange
// deep-oragne brown blue-gray
// grey shades

const mainColor = "orange"

const updateApiKeyValue = (value: string) => {
  apiKey.value = value;
  localStorage.setItem('apiKey', apiKey.value);
  setApiKey(apiKey.value);
}

const loadApiKey = () => {
  var result = localStorage.getItem('apiKey')

  if(result != null) {
    apiKey.value = result;
    setApiKey(apiKey.value);
  } else {
    console.log("apiKey is null")
  }
}

onBeforeMount(() => {
  loadApiKey();
})
</script>
