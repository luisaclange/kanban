const rules = {
  required: (item: string) => {
    return !!item || 'Esse campo é obrigatório';
  },
};

export default rules;
