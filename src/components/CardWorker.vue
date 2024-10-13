<template>
  <q-card flat bordered class="full-height" style="min-height: 200px">
    <q-card-section class="row justify-between items-center">
      <span class="text-h6">{{ worker.name }}</span>
      <div>
        <q-btn
          color="secondary"
          flat
          dense
          class="q-mr-sm"
          @click="openEditWorkerDialog"
        >
          <q-icon name="mdi-pencil-outline" size="sm" />
        </q-btn>
        <q-btn color="secondary" flat dense class="q-mr-sm" @click="openKanban">
          <q-icon name="mdi-table-large" size="sm" />
        </q-btn>
        <q-btn
          color="secondary"
          style="border-radius: 100%"
          dense
          class="q-ml-sm"
          @click="openNewTaskDialog"
        >
          <q-icon name="mdi-plus" size="sm" />
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="q-py-none">
      <q-separator />
    </q-card-section>
    <q-card-section
      v-if="tasks.tasksEmAndamento.length > 0"
      class="flex"
      style="min-height: inherit"
    >
      <CardTask :task="tasks.tasksEmAndamento[0]" />
      <div v-if="tasks.tasksEmAndamento.length > 1">
        <span>+ {{ tasks.tasksEmAndamento.length - 1 }}</span>
      </div>
    </q-card-section>
    <q-card-section
      v-else
      class="flex justify-center items-center q-py-none"
      style="min-height: inherit"
    >
      <div class="column items-center">
        <q-icon name="mdi-clock-outline" size="sm" class="q-mb-sm" />
        <span class="text-center text-body2">
          Não há nenhuma tarefa em andamento no momento
        </span>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none row">
      <div class="row items-center justify-center q-mr-md text-orange">
        <q-icon name="mdi-timer-sand-empty" class="q-mr-xs" />
        <span>{{ tasks.tasksAFazer }}</span>
      </div>
      <div class="row items-center justify-center q-mr-sm text-positive">
        <q-icon name="mdi-checkbox-marked-outline" class="q-mr-xs" />
        <span>{{ tasks.tasksConcluidas }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import IWorker from 'src/interfaces/worker';
import CardTask from './CardTask.vue';
import { computed, inject } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import { useQuasar } from 'quasar';
import NewTaskDialog from './NewTaskDialog.vue';
import NewWorkerDialog from './NewWorkerDialog.vue';

interface IProps {
  worker: IWorker;
}

const props = withDefaults(defineProps<IProps>(), {});

const openKanbanWorker = inject<(worker: IWorker) => void>('openKanbanWorker');

const tasks_store = useTasksStore();
const $q = useQuasar();

const tasks = computed(() => {
  const tasksEmAndamento = tasks_store.tasks
    .filter((item) => item.worker_id == props.worker?.id)
    .filter((item) => item.status == 'Em andamento');

  const tasksAFazer = tasks_store.tasks
    .filter((item) => item.worker_id == props.worker?.id)
    .filter(
      (item) => item.status == 'A fazer' || item.status == 'Backlog'
    ).length;

  const tasksConcluidas = tasks_store.tasks
    .filter((item) => item.worker_id == props.worker?.id)
    .filter((item) => item.status == 'Finalizado').length;

  return { tasksEmAndamento, tasksAFazer, tasksConcluidas };
});

const openNewTaskDialog = () => {
  $q.dialog({
    component: NewTaskDialog,
    componentProps: {
      worker: props.worker,
    },
  });
};

const openEditWorkerDialog = () => {
  $q.dialog({
    component: NewWorkerDialog,
    componentProps: {
      worker: props.worker,
    },
  });
};

const openKanban = () => {
  if (openKanbanWorker) {
    openKanbanWorker(props.worker);
  }
};
</script>
