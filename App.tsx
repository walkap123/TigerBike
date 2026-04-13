import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Bike } from './src/data/bikes';
import HomeScreen from './src/screens/HomeScreen';
import BikeDetailScreen from './src/screens/BikeDetailScreen';
import ActiveRideScreen from './src/screens/ActiveRideScreen';

export type RootStackParamList = {
  Home: undefined;
  BikeDetail: { bike: Bike };
  ActiveRide: { bike: Bike };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1e293b',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BikeDetail" component={BikeDetailScreen} options={{ title: 'Bike Details' }} />
        <Stack.Screen name="ActiveRide" component={ActiveRideScreen} options={{ title: 'Active Ride', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
