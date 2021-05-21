import React from 'react';

interface validateTypes {
  target: {
    value: string
  }
}

const types: any = {
  cep: {
    regex: /^\d{5}-?\d{3}$/,
    message: 'Cep inválido',
  },
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email inválido',
  },
  // password: {
  //   regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  //   message: `
  //   deve conter pelo menos um dígito \n
  //   deve conter pelo menos uma minúscula\n
  //   deve conter pelo menos uma maiúscula\n
  //   deve conter pelo menos 8 dos caracteres mencionados\n
  //   `,
  // },
}

const useFrom = (type: any) => {
const [value, setValue] = React.useState('');
const [error, setError] = React.useState('');

function validate(value: any) {
  if (type === false) return true;
  if (value.length === 0) {
    setError('Campo Obrigatório!');
    return false;
  } else if (types[type] && !types[type].regex.test(value)) {
    setError(types[type].message);
    return false;
  } else {
    setError('');
    return true;
  }
}

function onChange({ target }: validateTypes){
  if(error) validate(target.value);
  setValue(target.value)
}

 return{
  value,
  setValue,
  error,
  onChange,
  onBlur: () => validate(value),
  validate: () => value ? validate(value) : '',
 }
}

export default useFrom;