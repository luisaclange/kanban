<template>
  <div
    class="full-height full-width q-pa-md column"
    style="min-height: inherit"
  >
    <div class="row items-center">
      <q-btn
        flat
        dense
        icon="mdi-chevron-left"
        class="q-mr-md"
        @click="emit('back')"
      />
      <div class="row items-center">
        <q-icon name="mdi-table-large" size="lg" class="q-mr-md" />
        <span v-if="worker" class="text-h4">
          Colaborador: {{ worker.name }}
        </span>
        <span v-if="project" class="text-h4">
          Projeto: {{ project.description }}
        </span>
      </div>
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />

    <div class="row full-height" style="flex: 1" flat>
      <div
        v-for="status in statusData"
        :key="status.description"
        class="q-pa-sm col-3"
        style="min-height: inherit"
      >
        <CardStatus :status="status" :worker="worker" :project="project" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import statusData from 'src/constants/statusData';
import IWorker from 'src/interfaces/worker';
import CardStatus from './CardStatus.vue';
import IProject from 'src/interfaces/project';

const emit = defineEmits(['back']);

interface IProps {
  worker?: IWorker;
  project?: IProject;
}

withDefaults(defineProps<IProps>(), {});
</script>
