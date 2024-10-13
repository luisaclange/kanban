<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" flat style="min-width: 600px">
      <q-card-section class="row justify-between items-center">
        <span class="text-h5">
          {{ worker ? 'Atualizar colaborador' : 'Novo colaborador' }}
        </span>
        <q-btn dense flat icon="mdi-close" @click="onDialogHide" />
      </q-card-section>
      <q-card-section>
        <q-form ref="formRef">
          <q-input label="Nome" v-model="form.name" :rules="[rules.required]" />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-pa-md">
        <q-btn
          v-if="worker"
          color="primary"
          label="Excluir"
          outline
          @click="excludeWorker"
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
import IWorker from 'src/interfaces/worker';
import { useWorkersStore } from 'src/stores/workers';
import { ref } from 'vue';

interface IProps {
  worker?: IWorker;
}

const props = withDefaults(defineProps<IProps>(), {});

const form = ref<{
  name?: string;
}>({
  name: props.worker?.name,
});
const formRef = ref();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const workers_store = useWorkersStore();

const onOKClick = async () => {
  const validate = await formRef.value.validate();
  if (!validate) return;

  if (props.worker?.id) {
    workers_store.updateWorker(props.worker?.id, form.value);
  } else {
    workers_store.addNewWorker(form.value);
  }
  onDialogOK();
};

const excludeWorker = () => {
  if (props.worker?.id) workers_store.deleteWorker(props.worker?.id);
  onDialogOK();
};
</script>
