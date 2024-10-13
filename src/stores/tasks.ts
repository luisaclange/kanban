import { defineStore } from 'pinia';
import ITask from 'src/interfaces/task';
import { ref } from 'vue';
import db from 'src/services/db';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<ITask[]>([]);

  const addNewTask = async (newTask: ITask) => {
    await db.tasks.add({
      description: newTask.description,
      project_id: newTask.project_id,
      status: newTask.status,
      worker_id: newTask.worker_id,
    });
    await setTasksData();
  };

  const getTasksByUserId = (id: number) => {
    return tasks.value.filter((item) => item.worker_id == id);
  };

  const setTasksData = async () => {
    const dataTasks = await db.tasks.toArray();
    tasks.value = dataTasks;
  };

  const updateTask = async (id: number, values: ITask) => {
    const indexTask = tasks.value.findIndex((item) => item.id === id);
    if (indexTask > -1) {
      await db.tasks.update(id, values);
      tasks.value[indexTask] = {
        ...tasks.value[indexTask],
        ...values,
      };
    }
  };

  const deleteTask = async (id: number) => {
    const indexTask = tasks.value.findIndex((item) => item.id === id);
    if (indexTask > -1) {
      await db.tasks.delete(id);
      tasks.value.splice(indexTask, 1);
    }
  };

  return {
    tasks,
    addNewTask,
    getTasksByUserId,
    setTasksData,
    updateTask,
    deleteTask,
  };
});
