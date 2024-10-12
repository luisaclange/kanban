<template>
  <q-card flat class="bg-grey-9">
    <q-card-section>
      <!-- <q-badge>{{ task.projeto }}</q-badge> -->
      <q-badge>{{ task.status }}</q-badge>
    </q-card-section>
    <q-card-section>{{ task.descricao }}</q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import ITask from 'src/interfaces/task';

interface props {
  task: ITask;
}

withDefaults(defineProps<props>(), {});
</script>
