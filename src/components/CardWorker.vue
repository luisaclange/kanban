<template>
  <q-card flat bordered class="full-height" style="min-height: 200px">
    <q-card-section>
      <span>{{ colaborador.nome }}</span>
    </q-card-section>
    <q-card-section>
      <CardTask v-for="tarefa in tarefas" :key="tarefa.id" :task="tarefa" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import IWorker from 'src/interfaces/worker';
import CardTask from './CardTask.vue';
import { onMounted, ref } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import ITask from 'src/interfaces/task';

interface props {
  colaborador: IWorker;
}

const props = withDefaults(defineProps<props>(), {});

const tasks_store = useTasksStore();

const tarefas = ref<ITask[]>([]);

onMounted(() => {
  if (props.colaborador?.id)
    tarefas.value = tasks_store.getTasksByUserId(props.colaborador?.id);
});
</script>
