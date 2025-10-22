import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import PaymentScreen from './PaymentScreen';
import { RootStackParamList } from './type';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ title: 'Manage Menu' }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen} 
          options={{ title: 'Payment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

