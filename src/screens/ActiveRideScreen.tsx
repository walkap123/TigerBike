import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

const RATE_PER_MINUTE = 0.15;
const UNLOCK_FEE = 1.0;

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ActiveRide'>;
  route: RouteProp<RootStackParamList, 'ActiveRide'>;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${pad(s)}`;
}

export default function ActiveRideScreen({ navigation, route }: Props) {
  const { bike } = route.params;
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const cost = UNLOCK_FEE + (seconds / 60) * RATE_PER_MINUTE;

  function handleEndRide() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const minutes = Math.ceil(seconds / 60);
    const total = (UNLOCK_FEE + minutes * RATE_PER_MINUTE).toFixed(2);
    Alert.alert(
      'Ride Complete!',
      `Duration: ${formatTime(seconds)}\nTotal: $${total}`,
      [{ text: 'Done', onPress: () => navigation.popToTop() }]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.rideCard}>
          <Text style={styles.ridingLabel}>Riding</Text>
          <Text style={styles.bikeName}>{bike.name}</Text>
          <Text style={styles.location}>📍 {bike.location}</Text>
        </View>

        <View style={styles.timerCard}>
          <Text style={styles.timerLabel}>Elapsed</Text>
          <Text style={styles.timer}>{formatTime(seconds)}</Text>
        </View>

        <View style={styles.costCard}>
          <Text style={styles.costLabel}>Current Cost</Text>
          <Text style={styles.cost}>${cost.toFixed(2)}</Text>
          <Text style={styles.costBreakdown}>${UNLOCK_FEE.toFixed(2)} unlock + ${(seconds / 60 * RATE_PER_MINUTE).toFixed(2)} ride</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.endButton} onPress={handleEndRide} activeOpacity={0.85}>
          <Text style={styles.endText}>End Ride & Lock</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 24 },
  rideCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  ridingLabel: { fontSize: 12, color: '#22c55e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  bikeName: { fontSize: 22, fontWeight: '800', color: '#1e293b', marginTop: 4 },
  location: { fontSize: 14, color: '#64748b', marginTop: 4 },
  timerCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 28, alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  timerLabel: { fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  timer: { fontSize: 64, fontWeight: '800', color: '#fff', marginTop: 8 },
  costCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  costLabel: { fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  cost: { fontSize: 40, fontWeight: '800', color: '#f97316', marginTop: 4 },
  costBreakdown: { fontSize: 13, color: '#94a3b8', marginTop: 6 },
  footer: { padding: 24 },
  endButton: { backgroundColor: '#ef4444', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  endText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
