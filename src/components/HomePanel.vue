<template>
  <div>
    <div class="row justify-between">
      <div class="row items-center">
        <q-icon name="mdi-account-group-outline" size="lg" class="q-mr-md" />
        <span class="text-h4">Colaboradores</span>
      </div>

      <q-btn
        color="primary"
        label="Projetos"
        icon="mdi-cards-outline"
        class="text-body1 text-bold"
        @click="emit('goToProjects')"
      />
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />

    <div class="row">
      <div
        v-for="worker in workers_store.workers"
        :key="worker.id"
        class="q-pa-sm col-3"
      >
        <CardWorker :worker="worker" />
      </div>

      <div class="q-pa-sm col-3">
        <q-card
          flat
          bordered
          class="full-height flex justify-center items-center"
          style="border-style: dashed; min-height: 200px; cursor: pointer"
          @click="openNewWorkerDialog"
        >
          <q-icon name="mdi-plus" size="xl" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import CardWorker from 'src/components/CardWorker.vue';
import { useWorkersStore } from 'src/stores/workers';
import NewWorkerDialog from './NewWorkerDialog.vue';

const $q = useQuasar();
const workers_store = useWorkersStore();

const emit = defineEmits(['goToProjects']);

const openNewWorkerDialog = () => {
  $q.dialog({
    component: NewWorkerDialog,
  });
};
</script>
