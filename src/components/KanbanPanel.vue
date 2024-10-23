<template>
  <div
    class="full-height full-width q-pa-md flex column"
    style="min-height: inherit"
  >
    <div class="row items-center no-wrap">
      <q-btn
        flat
        dense
        icon="mdi-chevron-left"
        class="q-mr-md"
        @click="emit('back')"
      />
      <div class="row items-center no-wrap">
        <q-icon
          name="mdi-table-large"
          :size="$q.screen.lt.sm ? 'md' : 'lg'"
          class="q-mr-md"
        />
        <span v-if="worker" :class="$q.screen.lt.sm ? 'text-h5' : 'text-h4'">
          Colaborador
        </span>
        <span v-if="project" :class="$q.screen.lt.sm ? 'text-h5' : 'text-h4'">
          Projeto
        </span>
      </div>
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />

    <div class="row no-wrap q-mb-md justify-end items-center">
      <span v-if="worker" :class="$q.screen.lt.sm ? 'text-h6' : 'text-h5'">
        {{ worker.name }}
      </span>
      <span v-if="project" :class="$q.screen.lt.sm ? 'text-h6' : 'text-h5'">
        {{ project.description }}
      </span>
    </div>

    <div
      class="full-height flex"
      style="flex-direction: column; flex: 1; overflow-x: auto; max-width: 100%"
    >
      <div
        class="row full-height no-wrap"
        style="flex: 1; height: 100%"
        v-if="!loading"
      >
        <div
          v-for="status in statusData"
          :key="status.description"
          class="q-pa-sm col-3"
          style="min-height: inherit; min-width: 300px"
        >
          <CardStatus
            :status="status"
            v-model="tasks[status.description]"
            :worker="worker"
            :project="project"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import statusData from 'src/constants/statusData';
import IWorker from 'src/interfaces/worker';
import CardStatus from './CardStatus.vue';
import IProject from 'src/interfaces/project';
import { onMounted, ref, watch } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import ITask from 'src/interfaces/task';
import { useQuasar } from 'quasar';

const tasks_store = useTasksStore();
const $q = useQuasar();

const emit = defineEmits(['back']);

interface IProps {
  worker?: IWorker;
  project?: IProject;
}

const props = withDefaults(defineProps<IProps>(), {});

const tasks = ref<{
  [key: string]: ITask[];
}>({});
const loading = ref(true);

watch(
  tasks,
  () => {
    statusData.forEach((status) => {
      tasks.value[status.description].forEach(async (task) => {
        if (task.status !== status.description) {
          task.status = status.description;
          if (task.id) {
            await tasks_store.updateTask(task.id, {
              ...task,
            });
          }
        }
      });
    });
  },
  { deep: true }
);

onMounted(() => {
  let dataFiltrada = tasks_store.tasks;
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
  let data: {
    [key: string]: ITask[];
  } = {};
  statusData.forEach((status) => {
    if (status?.description)
      data[status.description] = dataFiltrada.filter(
        (item) => item.status == status.description
      );
  });
  tasks.value = data;
  loading.value = false;
});
</script>
