<template>
  <v-sheet
    class="justify-center ma-2"
  >
    <v-card
      color="#15181D"
      width="500px"
      height="500px"
    >
      <!-- <v-img
        src="data?.ArmoryProfile.CharacterImage"
        class="align-end"
        width="500px"
        height="500px"
      > -->

      <v-img
        class="align-end"
        width="500px"
        height="500px"
      >
        <!-- 서버 -->
        <v-chip
          class="ml-4"
          color="white"
          variant="elevated"
        >
          {{ data?.ArmoryProfile.ServerName }}
        </v-chip>

        <!-- 직업 -->
        <v-chip
          class="ml-2"
          color="white"
          variant="elevated"
        >
          {{ data?.ArmoryProfile.CharacterClassName }}
        </v-chip>

        <!-- 캐릭터명 -->
        <v-card-title
          class="text-white"
        >
          {{ data?.ArmoryProfile.CharacterName  }}
        </v-card-title>

        <v-card-subtitle
          class="text-white mb-2"
        >
          {{ data?.ArmoryProfile.Title }}
        </v-card-subtitle>

        <v-divider></v-divider>

        <v-card-text
          class="text-white"
        >
          <v-row
            class="pb-2 ma-0"
          >
            <v-col
              class="pa-0 ma-0"
            >
              <!-- 길드 -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                길드
              </v-chip>
              {{ data?.ArmoryProfile.GuildName }} <br>
            </v-col>
            <v-col
              class="pa-0 ma-0"
            >
              <!-- 원정대 -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                원정대
              </v-chip>
              {{ data?.ArmoryProfile.ExpeditionLevel }} <br>
            </v-col>
          </v-row>
          <v-row
            class="pb-2 ma-0"
          >
            <v-col
              class="pa-0 ma-0"
            >
              <!-- 영지 -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                영지
              </v-chip>
              Lv.{{ data?.ArmoryProfile.TownLevel }} {{ data?.ArmoryProfile.TownName }}
            </v-col>
            <v-col
              class="pa-0 ma-0"
            >
              <!-- 전투 -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                전투
              </v-chip>
              Lv.{{ data?.ArmoryProfile.CharacterLevel }}
            </v-col>
          </v-row>
          <v-row
            class="pb-2 ma-0"
          >
            <v-col
              class="pa-0 ma-0"
            >
              <!-- PVP -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                PVP
              </v-chip>
              {{ data?.ArmoryProfile.PvpGradeName }}
            </v-col>
            <v-col
              class="pa-0 ma-0"
            >
              <!-- 아이템 -->
              <v-chip
                class="mr-1"
                color="white"
                variant="outlined"
              >
                아이템
              </v-chip>
              Lv.{{ data?.ArmoryProfile.ItemMaxLevel }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-img>

    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import type { IProfile } from '../Requests'

const props = defineProps<{
  data?: IProfile
}>();
</script>