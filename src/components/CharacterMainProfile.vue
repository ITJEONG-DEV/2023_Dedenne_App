<template>
  <v-sheet
    class="justify-center ma-2 px-4"
  >
    <v-card
      color="#15181D"
      min-width="1000px"
      min-height="500px"
    >
      <v-list-group>
        <v-list-item>
          <v-img
            :src="props.data?.ArmoryEquipment[1].Icon"
          ></v-img>
          <v-text-field
            class="text-white"
          >
            {{ props.data?.ArmoryEquipment[1].Name  }}
          </v-text-field>
        </v-list-item>
      </v-list-group>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import type { IProfile, IArmoryEquipment } from '../Requests'

const props = defineProps<{
  data?: IProfile
}>();
</script>