// filepath: /c:/Users/mikel/Downloads/stock-app/stock-app/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './components/home';
import Shop from './components/shop';
import Info from './components/info';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'shop') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'info') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0984e3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="shop" component={Shop} />
        <Tab.Screen name="info" component={Info} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
