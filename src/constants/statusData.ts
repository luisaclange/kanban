import IStatus from 'src/interfaces/status';

const statusData: IStatus[] = [
  {
    description: 'Backlog',
    color: 'purple',
  },
  {
    description: 'A fazer',
    color: 'orange',
  },
  {
    description: 'Em andamento',
    color: 'yellow',
  },
  {
    description: 'Finalizado',
    color: 'green',
  },
];

export default statusData;
