import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BikeDetail'>;
  route: RouteProp<RootStackParamList, 'BikeDetail'>;
};

export default function BikeDetailScreen({ navigation, route }: Props) {
  const { bike } = route.params;
  const batteryColor = bike.battery > 60 ? '#22c55e' : bike.battery > 30 ? '#f59e0b' : '#ef4444';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🚲</Text>
        <Text style={styles.name}>{bike.name}</Text>
        <Text style={styles.location}>📍 {bike.location}</Text>

        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: batteryColor }]}>{bike.battery}%</Text>
            <Text style={styles.statLabel}>Battery</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>~{Math.round(bike.battery * 0.4)} mi</Text>
            <Text style={styles.statLabel}>Est. Range</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>$1.00</Text>
            <Text style={styles.statLabel}>to unlock</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>⚡ E-assist up to 20 mph</Text>
          <Text style={styles.infoText}>🔒 Lock at any bike rack</Text>
          <Text style={styles.infoText}>💳 $0.15 / min after unlock</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.unlockButton}
          onPress={() => navigation.navigate('ActiveRide', { bike })}
          activeOpacity={0.85}
        >
          <Text style={styles.unlockText}>Unlock Bike</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 40 },
  icon: { fontSize: 80, marginBottom: 16 },
  name: { fontSize: 28, fontWeight: '800', color: '#1e293b' },
  location: { fontSize: 15, color: '#64748b', marginTop: 6, marginBottom: 32 },
  statRow: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#94a3b8', marginTop: 4 },
  divider: { width: 1, backgroundColor: '#e2e8f0' },
  infoBox: { marginTop: 24, width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 20, gap: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  infoText: { fontSize: 14, color: '#475569' },
  footer: { padding: 24 },
  unlockButton: { backgroundColor: '#f97316', borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  unlockText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
