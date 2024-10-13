<template>
  <q-card flat bordered class="full-height flex column">
    <q-card-section class="row justify-between">
      <q-badge :color="status.color" text-color="black" class="text-h5">
        {{ status.description }}
      </q-badge>
    </q-card-section>
    <q-card-section class="q-py-none">
      <q-separator />
    </q-card-section>
    <q-card-section style="flex: 1">
      <q-scroll-area style="height: 100%">
        <CardTask
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          kanban-mode
          :is-worker="!!worker"
          :is-project="!!project"
        />
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import IStatus from 'src/interfaces/status';
import IWorker from 'src/interfaces/worker';
import { useTasksStore } from 'src/stores/tasks';
import { computed } from 'vue';
import CardTask from './CardTask.vue';
import IProject from 'src/interfaces/project';

interface IProps {
  status: IStatus;
  worker?: IWorker;
  project?: IProject;
}
const props = withDefaults(defineProps<IProps>(), {});

const tasks_store = useTasksStore();

const tasks = computed(() => {
  let dataFiltrada = tasks_store.tasks.filter(
    (item) => item.status == props.status.description
  );
  if (props.worker) {
    dataFiltrada = dataFiltrada.filter(
      (item) => item.worker_id === props.worker?.id
    );
  }
  if (props.project) {
    dataFiltrada = dataFiltrada.filter(
      (item) => item.project_id === props.project?.id
    );
  }
  return dataFiltrada;
});
</script>
