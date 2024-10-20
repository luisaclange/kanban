<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat class="row justify-center items-center bg-dark-page">
      <q-toolbar style="max-width: 1600px" class="q-py-md">
        <q-toolbar-title class="row items-center justify-center no-wrap">
          <q-icon name="mdi-chevron-double-right" size="40px" class="q-mr-md" />
          <q-avatar color="primary" size="60px">
            <span class="text-h3">K</span>
          </q-avatar>
          <div class="q-ml-sm">
            <span class="text-h3" style="letter-spacing: 6px">anban</span>
          </div>
          <q-icon name="mdi-chevron-double-left" size="40px" class="q-ml-md" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MainLayout',
});
</script>
