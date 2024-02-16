<template>
  <MainLayout>
    <q-layout view="lHh Lpr lFf">
      <HeaderLayout />
      <SideMenu />
      <q-page-container>
        <Contents
          v-bind:class="{
            'main-cont': $route.path === '/',
            'bg-e6e9ef': $route.path === '/reference',
          }"
        >
          <q-page>
            <PageTitle
              v-if="$route.path != '/'"
              :title="$route.name || ''"
            ></PageTitle>
            <div class="relative">
              <CircleBg v-if="$route.path != '/'">
                <router-view />
              </CircleBg>
              <router-view v-else />
            </div>
          </q-page>
        </Contents>
      </q-page-container>
      <FooterLayout />
    </q-layout>
  </MainLayout>
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
import CircleBg from 'src/components/CircleBg.vue';
import { QSpinnerDots, useQuasar } from 'quasar';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const selectedMenu = ref(route.path || '/');

router.beforeEach((to, from, next) => {
  $q.loading.show({
    spinner: QSpinnerDots,
    spinnerSize: 64,
  });
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    $q.loading.hide();
  }, 300);
});

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
  paddingTop: '72px',
  paddingBottom: '40px',
  '&.main-cont': {
    padding: 0,
    marginTop: '-50px',
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
