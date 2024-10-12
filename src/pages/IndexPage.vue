<template>
  <q-page class="column items-center">
    <div style="max-width: 1600px" class="full-width">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home">
          <span>Colaboradores</span>

          <div class="row">
            <div
              v-for="colaborador in workers_store.workers"
              :key="colaborador.id"
              class="q-pa-sm col-3"
            >
              <CardWorker :colaborador="colaborador" />
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
        </q-tab-panel>
        <q-tab-panel name="kanban">
          <span>Kanban</span>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import CardWorker from 'src/components/CardWorker.vue';
import NewWorkerDialog from 'src/components/NewWorkerDialog.vue';
import { useWorkersStore } from 'src/stores/workers';
import { ref } from 'vue';
defineOptions({
  name: 'IndexPage',
});

const workers_store = useWorkersStore();

const $q = useQuasar();
const tab = ref('home');

// const tarefas = ref<
//   {
//     descricao: string;
//     id: string;
//     status_id: string;
//     projeto_id: string;
//     user_id: string;
//   }[]
// >([]);

// const projetos = ref<
//   {
//     nome: string;
//     id: string;
//   }[]
// >([]);

const openNewWorkerDialog = () => {
  $q.dialog({
    component: NewWorkerDialog,
  });
};
</script>
