import { defineStore } from 'pinia';
import idGenerator from 'src/helpers/idGenerator';
import ITask from 'src/interfaces/task';
import { ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<ITask[]>([]);

  const addNewTask = (newTask: ITask) => {
    tasks.value.push({
      ...newTask,
      id: idGenerator(),
    });
    updateDataTasks();
  };

  const getTasksByUserId = (id: string) => {
    return tasks.value.filter((item) => item.user_id == id);
  };

  const updateDataTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
  };

  const setTasksData = () => {
    const dataTasks = localStorage.getItem('tasks');
    if (dataTasks) {
      const dataObjectTasks = JSON.parse(dataTasks);
      tasks.value = dataObjectTasks || [];
    }
  };

  return {
    tasks,
    addNewTask,
    getTasksByUserId,
    setTasksData,
  };
});
