<template>
    <v-btn
    @click="getNewsNotices();"
    ></v-btn>
</template>

<script setup lang="ts">
import { getNewsNotices } from '../Requests'

</script>