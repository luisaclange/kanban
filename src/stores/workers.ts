import { defineStore } from 'pinia';
import idGenerator from 'src/helpers/idGenerator';
import IWorker from 'src/interfaces/worker';
import { ref } from 'vue';

export const useWorkersStore = defineStore('workers', () => {
  const workers = ref<IWorker[]>([]);

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

  return {
    workers,
    addNewWorker,
    setWorkersData,
  };
});
