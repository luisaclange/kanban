const idGenerator = () => {
  return Math.random().toString(36).substring(2, 18);
};

export default idGenerator;
