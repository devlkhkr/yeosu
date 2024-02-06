<template>
  <MainLayout> </MainLayout>
  <q-layout view="lHh Lpr lFf">
    <HeaderLayout />
    <SideMenu />

    <q-page-container>
      <Contents
        v-bind:class="{
          'main-cont': $route.path === '/',
        }"
      >
        <q-page>
          <PageTitle v-if="$route.path != '/'" :title="$route.name"></PageTitle>
          <router-view />
        </q-page>
      </Contents>
    </q-page-container>
    <FooterLayout />
  </q-layout>
</template>
z
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { styled } from 'emotion-vuejs';
import SideMenu from './SideMenu.vue';
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';
import PageTitle from 'src/components/PageTitle.vue';

const route = useRoute();
const router = useRouter();
const selectedMenu = ref(route.path || '/');

const MainLayout = styled('div')({
  maxWidth: '720px',
  width: '100%',
  margin: '0 auto',
  overflowX: 'hidden',
  backgroundColor: '#fff',
});

const Contents = styled('div')({
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '50px',
  '&.main-cont': {
    padding: 0,
  },
});

watch(selectedMenu, (newValue, oldValue) => {
  if (newValue) {
    router.push(newValue);
  } else {
    selectedMenu.value = oldValue;
  }
});
</script>
