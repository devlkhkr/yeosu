<template>
  <q-header class="bg-transparent text-dark">
    <q-toolbar>
      <q-toolbar-title @click="() => $router.push('/')">
        Yeosu
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
  </q-header>
</template>
<script setup lang="ts">
import { drawerOpenState } from 'src/stores/example-store';

const drawerState = drawerOpenState();
</script>
