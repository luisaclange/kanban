import { defineStore } from 'pinia';
import IProject from 'src/interfaces/project';
import { ref } from 'vue';
import db from 'src/services/db';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<IProject[]>([]);

  const addNewProject = async (newProject: IProject) => {
    await db.projects.add({
      description: newProject.description,
    });
    await setProjectsData();
  };

  const setProjectsData = async () => {
    const dataProjects = await db.projects.toArray();
    projects.value = dataProjects;
  };

  const updateProject = async (id: number, values: IProject) => {
    const indexProject = projects.value.findIndex((item) => item.id === id);
    if (indexProject > -1) {
      await db.projects.update(id, values);
      projects.value[indexProject] = {
        ...projects.value[indexProject],
        ...values,
      };
    }
  };

  const deleteProject = async (id: number) => {
    const indexProject = projects.value.findIndex((item) => item.id === id);
    if (indexProject > -1) {
      await db.projects.delete(id);
      projects.value.splice(indexProject, 1);
    }
  };

  return {
    projects,
    addNewProject,
    setProjectsData,
    updateProject,
    deleteProject,
  };
});
