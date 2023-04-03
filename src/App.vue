<template>
  <v-app>
    <v-main>
      <LogoBar></LogoBar>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import LogoBar from './components/LogoBar.vue'

export default defineComponent({
  name: 'App',

  components: {
    HelloWorld,
    LogoBar
  },

  data () {
    return {
      //
    }
  },
})
</script>
