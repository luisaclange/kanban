import Dexie, { type EntityTable } from 'dexie';
import IWorker from 'src/interfaces/worker';
import IProject from 'src/interfaces/project';
import ITask from 'src/interfaces/task';

// Criar uma instância do banco de dados
const db = new Dexie('myDatabase') as Dexie & {
  workers: EntityTable<IWorker, 'id'>;
  tasks: EntityTable<ITask, 'id'>;
  projects: EntityTable<IProject, 'id'>;
};

// Definir a estrutura das tabelas
db.version(1).stores({
  workers: '++id, name',
  projects: '++id, description',
  tasks: '++id, description, worker_id, project_id, status',
});

// Exporta o banco de dados para ser usado em outros lugares
export default db;
