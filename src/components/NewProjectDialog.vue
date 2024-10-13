<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input label="Descrição" v-model="form.description" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-if="project"
          color="primary"
          label="Excluir"
          outline
          @click="excludeProject"
        />
        <q-space />
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import IProject from 'src/interfaces/project';
import { useProjectsStore } from 'src/stores/projects';
import { ref } from 'vue';

interface IProps {
  project?: IProject;
}
const projects_store = useProjectsStore();

const props = withDefaults(defineProps<IProps>(), {});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const form = ref<{
  description?: string;
}>({
  description: props.project?.description,
});

function onOKClick() {
  const data: IProject = {
    description: form.value?.description,
  };

  if (props.project?.id) {
    projects_store.updateProject(props.project?.id, data);
  } else {
    projects_store.addNewProject(data);
  }
  onDialogOK();
}

function excludeProject() {
  if (props.project?.id) projects_store.deleteProject(props.project?.id);
  onDialogOK();
}
</script>
