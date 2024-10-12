import { boot } from 'quasar/wrappers';
import { useTasksStore } from 'src/stores/tasks';
import { useWorkersStore } from 'src/stores/workers';

export default boot(() => {
  useWorkersStore().setWorkersData();
  useTasksStore().setTasksData();
});
