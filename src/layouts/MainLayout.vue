<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderLayout />
    <SideMenu />

    <q-page-container>
      <div class="q-px-md">
        <router-view />
      </div>
    </q-page-container>

    <FooterLayout />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import SideMenu from './SideMenu.vue';
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';
const route = useRoute();
const router = useRouter();
const selectedMenu = ref(route.path || '/');

watch(selectedMenu, (newValue, oldValue) => {
  if (newValue) {
    router.push(newValue);
  } else {
    selectedMenu.value = oldValue;
  }
});
</script>
