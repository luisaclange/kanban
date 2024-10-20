<template>
  <q-card flat bordered class="full-height" style="min-height: 200px">
    <q-card-section class="row justify-between items-center no-wrap">
      <span class="text-h6">{{ project.description }}</span>

      <div>
        <q-btn
          color="secondary"
          flat
          dense
          class="q-mr-sm"
          @click="openEditProjectDialog"
        >
          <q-icon name="mdi-pencil-outline" size="sm" />
        </q-btn>
        <q-btn color="secondary" flat dense class="q-mr-sm" @click="openKanban">
          <q-icon name="mdi-table-large" size="sm" />
        </q-btn>
        <q-btn
          style="border-radius: 100%"
          color="secondary"
          dense
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
      class="flex q-pb-none column justify-between"
      style="min-height: inherit"
    >
      <CardTask :task="tasks.tasksEmAndamento[0]" is-project />
      <div
        v-if="tasks.tasksEmAndamento.length > 1"
        style="height: fit-content"
        class="row justify-end full-width"
      >
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
    <q-card-section class="q-pt-sm row">
      <div class="row items-center justify-center q-mr-md text-orange">
        <q-icon name="mdi-timer-sand-empty" class="q-mr-xs" />
        <span>{{ tasks.tasksAFazer }}</span>
      </div>
      <div class="row items-center justify-center q-mr-md text-positive">
        <q-icon name="mdi-checkbox-marked-outline" class="q-mr-xs" />
        <span>{{ tasks.tasksConcluidas }}</span>
      </div>
      <div class="q-py-sm row" style="flex: 1; min-height: max-content">
        <div
          class="row full-width bg-card-color"
          style="border-radius: 8px; overflow: hidden; height: 100%"
        >
          <div
            v-for="status in barValues"
            :key="status.description"
            style="height: 100%"
            :style="`width: ${status.percentage}%`"
            :class="`bg-${status.color}`"
          >
            <q-tooltip class="text-caption"
              >{{ status.description }}: {{ status.percentage }}%</q-tooltip
            >
          </div>
        </div>
        <!-- <div style="width: 40%; height: 100%" class="bg-yellow" />
        <div style="width: 30%; height: 100%" class="bg-purple" />
        <div style="width: 20%; height: 100%" class="bg-blue" /> -->
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import IProject from 'src/interfaces/project';
import NewTaskDialog from './NewTaskDialog.vue';
import { computed, inject } from 'vue';
import NewProjectDialog from './NewProjectDialog.vue';
import { useTasksStore } from 'src/stores/tasks';
import CardTask from './CardTask.vue';
import statusData from 'src/constants/statusData';

const $q = useQuasar();

interface IProps {
  project: IProject;
}
const props = withDefaults(defineProps<IProps>(), {});

const tasks_store = useTasksStore();

const openKanbanProject =
  inject<(project: IProject) => void>('openKanbanProject');

const openNewTaskDialog = () => {
  $q.dialog({
    component: NewTaskDialog,
    componentProps: {
      project: props.project,
    },
  });
};

const openKanban = () => {
  if (openKanbanProject) {
    openKanbanProject(props.project);
  }
};

const openEditProjectDialog = () => {
  $q.dialog({
    component: NewProjectDialog,
    componentProps: {
      project: props.project,
    },
  });
};

const tasks = computed(() => {
  const tasksEmAndamento = tasks_store.tasks
    .filter((item) => item.project_id == props.project?.id)
    .filter((item) => item.status == 'Em andamento');

  const tasksAFazer = tasks_store.tasks
    .filter((item) => item.project_id == props.project?.id)
    .filter(
      (item) => item.status == 'A fazer' || item.status == 'Backlog'
    ).length;

  const tasksConcluidas = tasks_store.tasks
    .filter((item) => item.project_id == props.project?.id)
    .filter((item) => item.status == 'Finalizado').length;

  return { tasksEmAndamento, tasksAFazer, tasksConcluidas };
});

const barValues = computed(() => {
  const totalTasks = tasks_store.tasks.filter(
    (task) => task.project_id == props.project?.id
  ).length;
  const bar = statusData.map((item) => {
    let percentage = '0';
    if (totalTasks > 0) {
      percentage = (
        (tasks_store.tasks
          ?.filter((task) => task.project_id == props.project?.id)
          .filter((task) => task.status == item.description).length /
          totalTasks) *
        100
      ).toFixed(0);
    }

    return {
      ...item,
      percentage,
    };
  });
  return bar;
});
</script>
