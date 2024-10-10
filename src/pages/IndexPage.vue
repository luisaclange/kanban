<template>
  <q-page class="column items-center">
    <div style="max-width: 1600px" class="full-width">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home">
          <span>Colaboradores</span>

          <div class="row">
            <div
              v-for="colaborador in colaboradores"
              :key="colaborador.id"
              class="q-pa-sm col-3"
            >
              <q-card flat bordered>
                <q-card-section>
                  <span>{{ colaborador.nome }}</span>
                </q-card-section>
                <q-card-section>
                  <q-card flat class="bg-grey-9">
                    <q-card-section>
                      <q-badge>Hairo</q-badge>
                      <q-badge>Em andamento</q-badge>
                    </q-card-section>
                    <q-card-section>
                      Fazer detalhamento do gráfico de barras
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </q-card>
            </div>

            <div
              v-for="colaborador in colaboradores"
              :key="colaborador.id"
              class="q-pa-sm col-3"
            >
              <q-card
                flat
                bordered
                class="full-height flex justify-center items-center"
                style="border-style: dashed"
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
import { ref } from 'vue';
defineOptions({
  name: 'IndexPage',
});

const tab = ref('home');
const colaboradores = ref([
  {
    id: 1,
    nome: 'Mario Ayala',
  },
]);
</script>
