<template>
  <q-card flat bordered class="full-height">
    <q-card-section class="row justify-between">
      {{ status.descricao }}
    </q-card-section>
    <q-card-section>
      <CardTask v-for="task in tasks" :key="task.id" :task="task" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import IStatus from 'src/interfaces/status';
import IWorker from 'src/interfaces/worker';
import { useTasksStore } from 'src/stores/tasks';
import { computed } from 'vue';
import CardTask from './CardTask.vue';

interface IProps {
  status: IStatus;
  worker?: IWorker;
}
const props = withDefaults(defineProps<IProps>(), {});

const tasks_store = useTasksStore();

const tasks = computed(() => {
  return tasks_store.tasks.filter(
    (item) =>
      item.worker_id == props.worker?.id &&
      item.status == props.status.descricao
  );
});
</script>
