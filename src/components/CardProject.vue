<template>
  <q-card flat bordered class="full-height">
    <q-card-section class="row justify-between">
      {{ project.description }}

      <div>
        <q-btn
          icon="mdi-pencil-outline"
          color="secondary"
          outline
          dense
          class="q-mr-sm"
          @click="openEditProjectDialog"
        />
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
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import IProject from 'src/interfaces/project';
import NewTaskDialog from './NewTaskDialog.vue';
import { inject } from 'vue';
import NewProjectDialog from './NewProjectDialog.vue';

const $q = useQuasar();

interface IProps {
  project: IProject;
}
const props = withDefaults(defineProps<IProps>(), {});

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
</script>
