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
      <span v-if="worker">Colaborador: {{ worker.nome }}</span>
    </div>

    <div class="row" style="height: 100%">
      <div
        v-for="status in statusData"
        :key="status.descricao"
        class="q-pa-sm col-3"
        style="height: 100%"
      >
        <CardStatus :status="status" :worker="worker" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import statusData from 'src/constants/statusData';
import IWorker from 'src/interfaces/worker';
import CardStatus from './CardStatus.vue';

const emit = defineEmits(['back']);

interface IProps {
  worker?: IWorker;
}

withDefaults(defineProps<IProps>(), {});
</script>
