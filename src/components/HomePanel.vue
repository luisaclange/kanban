<template>
  <div>
    <span>Colaboradores</span>

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
          style="border-style: dashed; min-height: 200px"
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

const openNewWorkerDialog = () => {
  $q.dialog({
    component: NewWorkerDialog,
  });
};
</script>
