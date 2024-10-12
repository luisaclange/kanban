<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-select
          label="Colaborador"
          v-model="form.worker_id"
          :options="workers_store.workers"
          option-label="nome"
          option-value="id"
          map-options
          :disable="!!props.worker"
        />
        <q-input label="Descrição" v-model="form.descricao" />
        <q-select
          label="Status"
          v-model="form.status"
          :options="statusData"
          option-label="descricao"
          option-value="descricao"
          map-options
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
import ITask from 'src/interfaces/task';
import IWorker from 'src/interfaces/worker';
import { useTasksStore } from 'src/stores/tasks';
import { useWorkersStore } from 'src/stores/workers';
import { ref } from 'vue';

interface IProps {
  worker?: IWorker;
  task?: ITask;
}

const workers_store = useWorkersStore();
const tasks_store = useTasksStore();

const props = withDefaults(defineProps<IProps>(), {});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const form = ref<{
  worker_id?: string;
  descricao?: string;
  status?: string;
}>({
  worker_id: props.worker?.id || props.task?.worker_id,
  descricao: props.task?.descricao,
  status: props.task?.status,
});

function onOKClick() {
  const data: ITask = {
    descricao: form.value?.descricao,
    status: form.value?.status,
    worker_id: form.value?.worker_id,
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
