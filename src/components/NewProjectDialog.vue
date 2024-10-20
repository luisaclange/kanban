<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" flat style="max-width: 600px; width: 100%">
      <q-card-section class="row justify-between items-center">
        <span class="text-h5">
          {{ project ? 'Editar projeto' : 'Novo projeto' }}
        </span>
        <q-btn dense flat icon="mdi-close" @click="onDialogHide" />
      </q-card-section>
      <q-card-section>
        <q-form ref="formRef">
          <q-input
            label="Descrição"
            v-model="form.description"
            :rules="[rules.required]"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-pa-md">
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
import rules from 'src/helpers/rules';
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

const formRef = ref();

const onOKClick = async () => {
  const validate = await formRef.value.validate();
  if (!validate) return;

  const data: IProject = {
    description: form.value?.description,
  };

  if (props.project?.id) {
    await projects_store.updateProject(props.project?.id, data);
  } else {
    await projects_store.addNewProject(data);
  }
  onDialogOK();
};

const excludeProject = async () => {
  if (props.project?.id) await projects_store.deleteProject(props.project?.id);
  onDialogOK();
};
</script>
