<template>
  <q-card
    flat
    class="bg-card-color full-width"
    style="height: max-content; flex: 1"
    :class="bottomSpace ? 'q-mb-md' : ''"
    @click="openNewTaskDialog"
  >
    <q-card-section>
      <span class="text-h5">{{ task.description }}</span>
    </q-card-section>
    <q-card-section v-if="!kanbanMode" class="q-pt-none">
      <q-badge
        class="text-caption text-bold"
        :color="color"
        text-color="black"
        style="width: fit-content"
      >
        {{ task.status }}
      </q-badge>
    </q-card-section>
    <q-card-section class="q-py-none">
      <q-separator />
    </q-card-section>
    <q-card-section v-if="isWorker">
      <q-icon name="mdi-cards-outline" class="q-mr-sm" />
      <span class="text-body2">{{ projeto }}</span>
    </q-card-section>
    <q-card-section v-if="isProject">
      <q-icon name="mdi-account-outline" class="q-mr-sm" />
      <span class="text-body2">{{ colaborador }}</span>
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
import { useWorkersStore } from 'src/stores/workers';

const $q = useQuasar();

const projects_store = useProjectsStore();
const worker_store = useWorkersStore();

interface IProps {
  task: ITask;
  isWorker?: boolean;
  isProject?: boolean;
  kanbanMode?: boolean;
  bottomSpace?: boolean;
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

const colaborador = computed(() => {
  return worker_store.workers.find((item) => item.id == props.task?.worker_id)
    ?.name;
});

const color = computed(() => {
  const colorStatus = statusData.find(
    (item) => item.description == props.task?.status
  )?.color;
  return colorStatus;
});
</script>
