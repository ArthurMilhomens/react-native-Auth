import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Coolers from '../../screens/Coolers';
import Store from '../../screens/Store';
import Requests from '../../screens/Requests';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from '../../../types';
import Cooler from '../../../assets/svg/freezer-ice.svg';
import StoreIcon from '../../../assets/svg/snowflake.svg';
import Request from '../../../assets/svg/bag-ice.svg';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Refrigeradores"
      tabBarOptions={{ activeTintColor: '#535BFE', showLabel: false }}>
      <BottomTab.Screen
        name="Refrigeradores"
        component={CoolersNavigator}
        options={{
          tabBarIcon: ({ color }) => <Cooler width={30} height={30} fill={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Loja"
        component={StoreNavigator}
        options={{
          tabBarIcon: ({ color }) => <StoreIcon width={30} height={30} fill={color} stroke={color}/>,
        }}
      />
      <BottomTab.Screen
        name="Pedidos"
        component={RequestsNavigator}
        options={{
          tabBarIcon: ({ color }) => <Request width={30} height={30} color={color} fill={color}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function CoolersNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="CoolersScreen"
        component={Coolers}
        options={{ headerTitle: 'Refrigeradores' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function StoreNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="StoreScreen"
        component={Store}
        options={{ headerTitle: 'Loja' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function RequestsNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabThreeStack.Screen
        name="RequestsScreen"
        component={Requests}
        options={{ headerTitle: 'Pedidos' }}
      />
    </TabTwoStack.Navigator>
  );
}
