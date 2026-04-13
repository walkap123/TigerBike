import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bike } from './src/data/bikes';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ScanScreen from './src/screens/ScanScreen';
import BikeDetailScreen from './src/screens/BikeDetailScreen';
import ActiveRideScreen from './src/screens/ActiveRideScreen';

export type RootStackParamList = {
  Tabs: undefined;
  BikeDetail: { bike: Bike };
  ActiveRide: { bike: Bike };
};

export type TabParamList = {
  Home: undefined;
  Scan: undefined;
  Map: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function ScanButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={tabStyles.scanWrapper}>
      <TouchableOpacity style={tabStyles.scanButton} onPress={onPress} activeOpacity={0.85}>
        <Text style={tabStyles.scanEmoji}>📷</Text>
        <Text style={tabStyles.scanLabel}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { borderTopColor: '#e2e8f0', height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🚲</Text>,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: (props) => (
            <ScanButton onPress={props.onPress as () => void} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗺️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="BikeDetail" component={BikeDetailScreen} options={{ title: 'Bike Details' }} />
        <Stack.Screen name="ActiveRide" component={ActiveRideScreen} options={{ title: 'Active Ride', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  scanWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    top: -20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  scanEmoji: { fontSize: 24 },
  scanLabel: { fontSize: 10, color: '#fff', fontWeight: '700', marginTop: 1 },
});
