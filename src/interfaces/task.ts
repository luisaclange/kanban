interface ITask {
  id?: number;
  description?: string;
  status?: string;
  worker_id?: number;
  project_id?: number;
}

export default ITask;
