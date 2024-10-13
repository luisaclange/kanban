import { boot } from 'quasar/wrappers';
import { useProjectsStore } from 'src/stores/projects';
import { useTasksStore } from 'src/stores/tasks';
import { useWorkersStore } from 'src/stores/workers';

export default boot(() => {
  useWorkersStore().setWorkersData();
  useTasksStore().setTasksData();
  useProjectsStore().setProjectsData();
});
