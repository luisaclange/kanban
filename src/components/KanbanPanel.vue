<template>
  <div>
    <div class="row">
      <q-btn
        flat
        dense
        icon="mdi-chevron-left"
        class="q-mr-md"
        @click="emit('back')"
      />
      <span v-if="worker">Colaborador: {{ worker.name }}</span>
      <span v-if="project">Projeto: {{ project.description }}</span>
    </div>

    <div class="row" style="height: 100%">
      <div
        v-for="status in statusData"
        :key="status.description"
        class="q-pa-sm col-3"
        style="height: 100%"
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
