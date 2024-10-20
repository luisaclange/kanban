<template>
  <div>
    <div class="row justify-between no-wrap">
      <div class="row items-center">
        <q-icon
          name="mdi-account-group-outline"
          :size="$q.screen.lt.sm ? 'md' : 'lg'"
          class="q-mr-md"
        />
        <span :class="$q.screen.lt.sm ? 'text-h5' : 'text-h4'">
          Colaboradores
        </span>
      </div>

      <q-btn
        color="primary"
        class="text-body1 text-bold"
        :dense="$q.screen.lt.sm"
        @click="emit('goToProjects')"
      >
        <q-icon
          name="mdi-cards-outline"
          :class="$q.screen.lt.sm ? '' : 'q-mr-sm'"
        />
        <span v-if="!$q.screen.lt.sm">Projetos</span>
      </q-btn>
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />

    <div class="row">
      <div
        v-for="worker in workers_store.workers"
        :key="worker.id"
        class="q-pa-sm col-lg-3 col-md-4 col-sm-6 col-12"
      >
        <CardWorker :worker="worker" />
      </div>

      <div class="q-pa-sm col-lg-3 col-md-4 col-sm-6 col-12">
        <q-card
          flat
          bordered
          class="full-height flex justify-center items-center"
          style="border-style: dashed; min-height: 300px; cursor: pointer"
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
