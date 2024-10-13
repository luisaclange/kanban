<template>
  <q-card flat class="bg-grey-9" @click="openNewTaskDialog">
    <q-card-section>
      <!-- <q-badge>{{ task.projeto }}</q-badge> -->
      <q-badge>{{ task.status }}</q-badge>
    </q-card-section>
    <q-card-section>{{ task.description }}</q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ITask from 'src/interfaces/task';
import NewTaskDialog from './NewTaskDialog.vue';

const $q = useQuasar();

interface IProps {
  task: ITask;
}

const props = withDefaults(defineProps<IProps>(), {});

const openNewTaskDialog = () => {
  $q.dialog({
    component: NewTaskDialog,
    componentProps: {
      task: props.task,
    },
  });
};
</script>
