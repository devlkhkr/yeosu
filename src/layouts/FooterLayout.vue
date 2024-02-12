<template>
  <q-footer class="bg-transparent">
    <MaxWidthCont class="q-pa-md text-caption bg-333">
      <div class="flex items-center">
        <div>&#169; 2024 InnoBL. All Rights Reserved.</div>
        <span class="q-ml-auto"
          ><q-icon
            name="o_verified"
            color="amber-12"
            size="xs"
            @click="$router.push('/reference')"
        /></span>
      </div>
    </MaxWidthCont>
  </q-footer>
</template>
<script setup lang="ts">
import { MaxWidthCont } from 'src/styled/common';
</script>
