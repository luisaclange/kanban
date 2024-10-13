<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" flat style="min-width: 600px">
      <q-card-section class="row justify-between items-center">
        <span class="text-h5">
          {{ task ? 'Editar tarefa' : 'Nova tarefa' }}
        </span>
        <q-btn dense flat icon="mdi-close" @click="onDialogHide" />
      </q-card-section>
      <q-card-section>
        <q-form ref="formRef">
          <q-select
            label="Colaborador"
            v-model="form.worker_id"
            :options="workers_store.workers"
            option-label="name"
            option-value="id"
            map-options
            emit-value
            :disable="!!props.worker"
            :rules="[rules.required]"
          />
          <q-select
            label="Projeto"
            v-model="form.project_id"
            :options="projects_store.projects"
            option-label="description"
            option-value="id"
            map-options
            emit-value
            :disable="!!props.project"
            :rules="[rules.required]"
          >
            <template #no-option>
              <q-item>Não há projetos cadastrados. Primeiro cadastre um</q-item>
            </template>
          </q-select>
          <q-select
            label="Status"
            v-model="form.status"
            :options="statusData"
            option-label="description"
            option-value="description"
            map-options
            emit-value
            :rules="[rules.required]"
          />
          <q-input
            label="Descrição"
            v-model="form.description"
            type="textarea"
            maxlength="500"
            :rules="[rules.required]"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-pa-md">
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
import rules from 'src/helpers/rules';
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
  worker_id?: number;
  description?: string;
  status?: string;
  project_id?: number;
}>({
  worker_id: props.worker?.id || props.task?.worker_id,
  description: props.task?.description,
  status: props.task?.status,
  project_id: props.project?.id || props.task?.project_id,
});
const formRef = ref();

const onOKClick = async () => {
  const validate = await formRef.value.validate();
  if (!validate) return;

  const data: ITask = {
    description: form.value?.description,
    status: form.value?.status,
    worker_id: form.value?.worker_id,
    project_id: form.value?.project_id,
  };

  console.log(data);

  if (props.task?.id) {
    tasks_store.updateTask(props.task?.id, data);
  } else {
    console.log('chegou aquii');
    tasks_store.addNewTask(data);
  }
  onDialogOK();
};

function excludeTask() {
  if (props.task?.id) tasks_store.deleteTask(props.task?.id);
  onDialogOK();
}
</script>
