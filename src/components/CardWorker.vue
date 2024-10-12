<template>
  <q-card flat bordered class="full-height" style="min-height: 200px">
    <q-card-section class="row justify-between">
      <span>{{ worker.nome }}</span>
      <div>
        <q-btn
          icon="mdi-table-large"
          color="secondary"
          outline
          dense
          class="q-mr-sm"
          @click="openKanban"
        />
        <q-btn
          icon="mdi-plus"
          color="secondary"
          dense
          @click="openNewTaskDialog"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <CardTask v-for="task in tasks" :key="task.id" :task="task" />
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

interface IProps {
  worker: IWorker;
}

const props = withDefaults(defineProps<IProps>(), {});

const openKanbanWorker = inject<(worker: IWorker) => void>('openKanbanWorker');

const tasks_store = useTasksStore();
const $q = useQuasar();

const tasks = computed(() => {
  return tasks_store.tasks.filter((item) => item.worker_id == props.worker?.id);
});

const openNewTaskDialog = () => {
  $q.dialog({
    component: NewTaskDialog,
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
