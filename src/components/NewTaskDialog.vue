<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-select
          label="Colaborador"
          v-model="form.worker_id"
          :options="workers_store.workers"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          :disable="!!props.worker"
        />
        <q-select
          label="Projeto"
          v-model="form.project_id"
          :options="projects_store.projects"
          option-label="name"
          option-value="id"
          map-options
          emit-value
          :disable="!!props.project"
        />
        <q-input label="Descrição" v-model="form.description" />
        <q-select
          label="Status"
          v-model="form.status"
          :options="statusData"
          option-label="description"
          option-value="description"
          map-options
          emit-value
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-if="task"
          color="primary"
          label="Excluir"
          outline
          @click="excludeTask"
        />
        <q-space />
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import statusData from 'src/constants/statusData';
import IProject from 'src/interfaces/project';
import ITask from 'src/interfaces/task';
import IWorker from 'src/interfaces/worker';
import { useProjectsStore } from 'src/stores/projects';
import { useTasksStore } from 'src/stores/tasks';
import { useWorkersStore } from 'src/stores/workers';
import { ref } from 'vue';

interface IProps {
  worker?: IWorker;
  task?: ITask;
  project?: IProject;
}

const workers_store = useWorkersStore();
const projects_store = useProjectsStore();
const tasks_store = useTasksStore();

const props = withDefaults(defineProps<IProps>(), {});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const form = ref<{
  worker_id?: string;
  description?: string;
  status?: string;
  project_id?: string;
}>({
  worker_id: props.worker?.id || props.task?.worker_id,
  description: props.task?.description,
  status: props.task?.status,
  project_id: props.project?.id || props.task?.project_id,
});

function onOKClick() {
  const data: ITask = {
    description: form.value?.description,
    status: form.value?.status,
    worker_id: form.value?.worker_id,
    project_id: form.value?.project_id,
  };

  if (props.task?.id) {
    tasks_store.updateTask(props.task?.id, data);
  } else {
    tasks_store.addNewTask(data);
  }
  onDialogOK();
}

function excludeTask() {
  if (props.task?.id) tasks_store.deleteTask(props.task?.id);
  onDialogOK();
}
</script>
