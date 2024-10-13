<template>
  <div>
    <div class="row items-center">
      <q-btn
        flat
        dense
        icon="mdi-chevron-left"
        class="q-mr-md"
        @click="emit('back')"
      />
      <div class="row items-center">
        <q-icon name="mdi-cards-outline" size="lg" class="q-mr-md" />
        <span class="text-h4">Projetos</span>
      </div>
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />

    <div class="row">
      <div
        v-for="project in projects_store.projects"
        :key="project.id"
        class="q-pa-sm col-3"
      >
        <CardProject :project="project" />
      </div>

      <div class="q-pa-sm col-3">
        <q-card
          flat
          bordered
          class="full-height flex justify-center items-center"
          style="border-style: dashed; min-height: 300px; cursor: pointer"
          @click="openNewProjectDialog"
        >
          <q-icon name="mdi-plus" size="xl" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useProjectsStore } from 'src/stores/projects';
import NewProjectDialog from './NewProjectDialog.vue';
import CardProject from './CardProject.vue';

const emit = defineEmits(['back']);

const $q = useQuasar();

const projects_store = useProjectsStore();

const openNewProjectDialog = () => {
  $q.dialog({
    component: NewProjectDialog,
  });
};
</script>
