import api from './api';

interface User {
  email: string;
  password: string;
}

export async function signIn({ email, password }:User){
  const response = await api.post('/cliente/auth', { password: password, username: email })
  
  return response
};