<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat class="row justify-center items-center bg-transparent">
      <q-toolbar style="max-width: 1600px">
        <q-toolbar-title> Logo do projeto </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

defineOptions({
  name: 'MainLayout',
});
</script>
