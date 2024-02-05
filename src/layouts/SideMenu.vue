<template>
  <q-drawer
    v-model="drawerState.isOpened"
    show-if-above
    bordered
    :width="300"
    side="right"
  >
    <div>
      <q-list>
        <q-item-label header> 안녕하세요 홍길동님 :) </q-item-label>

        <EssentialLink
          v-for="link in Links"
          :key="link.title"
          v-bind="link"
          :drawerOpen="drawerState.isOpened"
        />
      </q-list>
    </div>
    <q-footer class="bg-white q-pa-md">
      <q-btn
        class="full-width"
        color="primary"
        label="고객센터 : 010-1234-5678"
        icon="support_agent"
        outline
        unelevated
      />
    </q-footer>
  </q-drawer>
</template>

<script setup lang="ts">
import EssentialLink from 'src/components/EssentialLink.vue';
import { Links } from '../router/links';
import { drawerOpenState } from 'src/stores/example-store';

const drawerState = drawerOpenState();
</script>
