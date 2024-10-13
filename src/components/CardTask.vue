<template>
  <q-card
    flat
    class="bg-card-color full-width"
    style="height: max-content; flex: 1"
    @click="openNewTaskDialog"
  >
    <q-card-section>
      <span class="text-body1">{{ projeto }}</span>
    </q-card-section>
    <q-card-section class="q-py-none">
      <span class="text-h5">{{ task.description }}</span>
    </q-card-section>
    <q-card-section>
      <q-badge
        class="text-caption text-bold"
        :color="color"
        text-color="black"
        style="width: fit-content"
      >
        {{ task.status }}
      </q-badge>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import ITask from 'src/interfaces/task';
import NewTaskDialog from './NewTaskDialog.vue';
import { computed } from 'vue';
import { useProjectsStore } from 'src/stores/projects';
import statusData from 'src/constants/statusData';

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

const color = computed(() => {
  const colorStatus = statusData.find(
    (item) => item.description == props.task?.status
  )?.color;
  return colorStatus;
});
</script>
