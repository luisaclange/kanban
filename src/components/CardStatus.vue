<template>
  <q-card flat bordered class="full-height flex column">
    <q-card-section class="row justify-between">
      <q-badge :color="status.color" text-color="black" class="text-h5">
        {{ status.description }}
      </q-badge>
    </q-card-section>
    <q-card-section class="q-py-none">
      <q-separator />
    </q-card-section>
    <q-card-section style="flex: 1">
      <q-scroll-area style="height: 100%; display: flex">
        <draggableComponent
          v-model="tasks"
          item-key="id"
          group="status"
          :move="moveTask"
          style="min-height: inherit; flex: 1"
        >
          <template #item="{ element }">
            <CardTask
              :task="element"
              kanban-mode
              :bottom-space="true"
              :is-worker="!!worker"
              :is-project="!!project"
            />
          </template>
        </draggableComponent>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import IStatus from 'src/interfaces/status';
import IWorker from 'src/interfaces/worker';
import CardTask from './CardTask.vue';
import IProject from 'src/interfaces/project';
import draggableComponent from 'vuedraggable';
import ITask from 'src/interfaces/task';

interface IProps {
  status: IStatus;
  worker?: IWorker;
  project?: IProject;
}
withDefaults(defineProps<IProps>(), {});

const tasks = defineModel<ITask[]>();

const moveTask = (e: unknown) => {
  console.log('aquiii', e);
};
</script>
