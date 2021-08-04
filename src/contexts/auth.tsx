import React, { createContext, useState, useEffect, useContext } from "react";
import { signIn } from '../services/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  login({ email, password }:loginData): Promise<void>;
  logout(): void;
}

interface loginData {
  email: string,
  password: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

      await new Promise(resolve => {setTimeout(resolve, 2150)}).then(() => {
        if(storagedToken && storagedUser){
          setUser(JSON.parse(storagedUser)); 
          setLoading(false);
        } else {
          setLoading(false)
        }
      })
    }

    loadStorageData();
  })
  
  async function login({ email, password }:loginData) {
    const response = await signIn({email, password});

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.object))
    await AsyncStorage.setItem('@RNAuth:token', response.data.token)

    setUser(response.data.object);
  }

  function logout(){
    AsyncStorage.clear().then(() => {
      setUser(null);
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
};