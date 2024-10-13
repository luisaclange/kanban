import { defineStore } from 'pinia';
import idGenerator from 'src/helpers/idGenerator';
import IProject from 'src/interfaces/project';
import { ref } from 'vue';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<IProject[]>([]);

  const addNewProject = (newProject: IProject) => {
    projects.value.push({
      ...newProject,
      id: idGenerator(),
    });
    updateDataProjects();
  };

  const updateDataProjects = () => {
    localStorage.setItem('projects', JSON.stringify(projects.value));
  };

  const setProjectsData = () => {
    const dataProjects = localStorage.getItem('projects');
    if (dataProjects) {
      const dataObjectProjects = JSON.parse(dataProjects);
      projects.value = dataObjectProjects || [];
    }
  };

  const updateProject = (id: string, values: IProject) => {
    const indexProject = projects.value.findIndex((item) => item.id === id);
    if (indexProject > -1) {
      projects.value[indexProject] = {
        ...projects.value[indexProject],
        ...values,
      };
    }
    updateDataProjects();
  };

  const deleteProject = (id: string) => {
    const indexProject = projects.value.findIndex((item) => item.id === id);
    projects.value.splice(indexProject, 1);
    updateDataProjects();
  };

  return {
    projects,
    addNewProject,
    setProjectsData,
    updateProject,
    deleteProject,
  };
});
