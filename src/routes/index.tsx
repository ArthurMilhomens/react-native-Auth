import React, {  useEffect } from "react";
import * as Font from 'expo-font';
import { View, Image } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from "../contexts/auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from './navigation/index';

export default function Routes(){
  const { signed, loading } = useAuth();

  useEffect(() => {
    async function load() {
      SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        'poppins-regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'segoe-ui': require('../../assets/fonts/Segoe-ui.ttf'),
      });
    }

    load();
  }, []);

  if (loading) {
    return (
      //splashscreen
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5165ff' }}>
        <Image
          style={{ resizeMode: 'cover' }}
          source={require('../../assets/splashscreen.gif')}
          onLoad={() => SplashScreen.hideAsync()}
          />
      </View>
    )
  }

  return signed ? <AppRoutes /> : <AuthRoutes />
}