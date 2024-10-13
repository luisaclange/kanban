<template>
  <q-page class="column items-center">
    <div style="max-width: 1600px" class="full-width">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home">
          <HomePanel @go-to-projects="goProjects" />
        </q-tab-panel>
        <q-tab-panel name="projects">
          <ProjectsPanel @back="back" />
        </q-tab-panel>
        <q-tab-panel name="kanban">
          <KanbanPanel :worker="worker" :project="project" @back="back" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HomePanel from 'src/components/HomePanel.vue';
import KanbanPanel from 'src/components/KanbanPanel.vue';
import ProjectsPanel from 'src/components/ProjectsPanel.vue';
import IProject from 'src/interfaces/project';
import IWorker from 'src/interfaces/worker';
import { provide, ref } from 'vue';
defineOptions({
  name: 'IndexPage',
});

const tab = ref('home');
const worker = ref<IWorker>();
const project = ref<IProject>();

provide('openKanbanWorker', (user: IWorker) => {
  worker.value = user;
  tab.value = 'kanban';
});

provide('openKanbanProject', (proj: IProject) => {
  project.value = proj;
  tab.value = 'kanban';
});

const back = () => {
  if (project.value && tab.value == 'kanban') {
    tab.value = 'projects';
  } else {
    worker.value = undefined;
    tab.value = 'home';
  }
};

const goProjects = () => {
  tab.value = 'projects';
};
</script>
