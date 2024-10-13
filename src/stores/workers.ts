import { defineStore } from 'pinia';
import idGenerator from 'src/helpers/idGenerator';
import IWorker from 'src/interfaces/worker';
import { ref } from 'vue';
import { useTasksStore } from './tasks';

export const useWorkersStore = defineStore('workers', () => {
  const workers = ref<IWorker[]>([]);

  const tasks_store = useTasksStore();

  const addNewWorker = (newWorker: IWorker) => {
    workers.value.push({
      ...newWorker,
      id: idGenerator(),
    });
    updateDataWorkers();
  };

  const updateDataWorkers = () => {
    localStorage.setItem('workers', JSON.stringify(workers.value));
  };

  const setWorkersData = () => {
    const dataWorkers = localStorage.getItem('workers');
    if (dataWorkers) {
      const dataObjectWorkers = JSON.parse(dataWorkers);
      workers.value = dataObjectWorkers || [];
    }
  };

  const updateWorker = (id: string, values: IWorker) => {
    const indexWorker = workers.value.findIndex((item) => item.id === id);
    if (indexWorker > -1) {
      workers.value[indexWorker] = {
        ...workers.value[indexWorker],
        ...values,
      };
    }
    updateDataWorkers();
  };

  const deleteWorker = (id: string) => {
    const tasksUser = tasks_store.tasks.filter((item) => item.worker_id == id);
    tasksUser.forEach((task) => {
      if (task.id)
        tasks_store.updateTask(task?.id, {
          worker_id: undefined,
        });
    });
    const indexWorker = workers.value.findIndex((item) => item.id === id);
    workers.value.splice(indexWorker, 1);
    updateDataWorkers();
  };

  return {
    workers,
    addNewWorker,
    setWorkersData,
    updateWorker,
    deleteWorker,
  };
});
