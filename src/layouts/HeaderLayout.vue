<template>
  <q-header
    reveal
    class="text-dark bg-transparent"
    v-bind:class="{
      'main-header': $route.path === '/',
    }"
  >
    <MaxWidthCont>
      <HeaderColorWrap
        v-bind:class="{
          'bg-white': isScrolled || $route.path != '/',
        }"
      >
        <q-toolbar>
          <q-toolbar-title>
            <StyledLogo
              @click="
                () => {
                  $router.push('/');
                }
              "
              >Yeosu</StyledLogo
            >
          </q-toolbar-title>
          <div>
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="drawerState.open"
            />
          </div>
        </q-toolbar>
      </HeaderColorWrap>
    </MaxWidthCont>
  </q-header>
</template>
<script setup lang="ts">
import { drawerOpenState } from 'src/stores/example-store';
import { styled } from 'emotion-vuejs';
import { MaxWidthCont } from '../styled/common';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isScrolled = ref(false);
const drawerState = drawerOpenState();
const route = useRoute();

window.addEventListener('scroll', () => {
  isScrolled.value = route.path === '/' && window.scrollY > 50 ? true : false;
});

const StyledLogo = styled('h1')({
  display: 'inline-block',
  width: 'auto',
  cursor: 'pointer',
});

const HeaderColorWrap = styled('div')({
  transitionDuration: '0.3s',
});
</script>
