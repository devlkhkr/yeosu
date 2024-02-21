<template>{{ rsvNo }}</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const rsvNo = route.params.rsvNo as string;
</script>
