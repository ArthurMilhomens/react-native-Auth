import React from 'react';
import Login from '../screens/Login';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default function AuthRoutes(){
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
    </AuthStack.Navigator>
  )
}