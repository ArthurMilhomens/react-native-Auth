import api from './api';

interface User {
  email: string;
}

export async function recoverPassword({ email }:User){
  const response = await api.get('/email/send?email=' + email)

  console.log(response)

  return response
};