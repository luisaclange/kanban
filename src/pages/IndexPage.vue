<template>
  <q-page class="column items-center">
    <div style="max-width: 1600px" class="full-width">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home">
          <HomePanel />
        </q-tab-panel>
        <q-tab-panel name="kanban">
          <KanbanPanel :worker="worker" @back="backHome" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HomePanel from 'src/components/HomePanel.vue';
import KanbanPanel from 'src/components/KanbanPanel.vue';
import IWorker from 'src/interfaces/worker';
import { provide, ref } from 'vue';
defineOptions({
  name: 'IndexPage',
});

const tab = ref('home');
const worker = ref<IWorker>();

provide('openKanbanWorker', (user: IWorker) => {
  worker.value = user;
  tab.value = 'kanban';
});

const backHome = () => {
  worker.value = undefined;
  tab.value = 'home';
};
</script>
