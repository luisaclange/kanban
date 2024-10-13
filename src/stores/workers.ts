import { defineStore } from 'pinia';
import IWorker from 'src/interfaces/worker';
import { ref } from 'vue';
import { useTasksStore } from './tasks';
import db from 'src/services/db';

export const useWorkersStore = defineStore('workers', () => {
  const workers = ref<IWorker[]>([]);

  const tasks_store = useTasksStore();

  const addNewWorker = async (newWorker: IWorker) => {
    await db.workers.add({
      name: newWorker.name,
    });
    await setWorkersData();
  };

  const setWorkersData = async () => {
    const dataWorkers = await db.workers?.toArray();
    workers.value = dataWorkers;
  };

  const updateWorker = async (id: number, values: IWorker) => {
    const indexWorker = workers.value.findIndex((item) => item.id === id);
    if (indexWorker > -1) {
      await db.workers.update(id, values);
      workers.value[indexWorker] = {
        ...workers.value[indexWorker],
        ...values,
      };
    }
  };

  const deleteWorker = async (id: number) => {
    const indexWorker = workers.value.findIndex((item) => item.id === id);
    if (indexWorker > -1) {
      const tasksUser = tasks_store.tasks.filter(
        (item) => item.worker_id == id
      );
      tasksUser.forEach((task) => {
        if (task.id)
          tasks_store.updateTask(task?.id, {
            worker_id: undefined,
          });
      });
      await db.workers.delete(id);
      workers.value.splice(indexWorker, 1);
    }
  };

  return {
    workers,
    addNewWorker,
    setWorkersData,
    updateWorker,
    deleteWorker,
  };
});
