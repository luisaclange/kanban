<template>
  <q-card flat class="bg-card-color full-width" @click="openNewTaskDialog">
    <q-card-section>
      <q-badge>{{ projeto }}</q-badge>
      <q-badge>{{ task.status }}</q-badge>
    </q-card-section>
    <q-card-section>{{ task.description }}</q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ITask from 'src/interfaces/task';
import NewTaskDialog from './NewTaskDialog.vue';
import { computed } from 'vue';
import { useProjectsStore } from 'src/stores/projects';

const $q = useQuasar();

const projects_store = useProjectsStore();

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

const projeto = computed(() => {
  return projects_store.projects.find(
    (item) => item.id == props.task?.project_id
  )?.description;
});
</script>
