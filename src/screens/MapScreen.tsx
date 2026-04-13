import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BIKES, Bike } from '../data/bikes';
import { RootStackParamList } from '../../App';

type Props = {};

const INITIAL_REGION: Region = {
  latitude: 40.3460,
  longitude: -74.6580,
  latitudeDelta: 0.018,
  longitudeDelta: 0.018,
};

export default function MapScreen({}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState<Bike | null>(null);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION}>
        {BIKES.map(bike => (
          <Marker
            key={bike.id}
            coordinate={bike.coordinate}
            onPress={() => setSelected(bike)}
          >
            <View style={[styles.pin, !bike.available && styles.pinUnavailable]}>
              <Text style={styles.pinEmoji}>🚲</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {selected && (
        <View style={styles.card}>
          <TouchableOpacity style={styles.dismiss} onPress={() => setSelected(null)}>
            <Text style={styles.dismissText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.cardName}>{selected.name}</Text>
          <Text style={styles.cardLocation}>📍 {selected.location}</Text>
          <View style={styles.cardRow}>
            <View style={[styles.badge, selected.available ? styles.badgeAvailable : styles.badgeUnavailable]}>
              <Text style={styles.badgeText}>{selected.available ? 'Available' : 'In Use'}</Text>
            </View>
          </View>
          {selected.available && (
            <TouchableOpacity
              style={styles.unlockButton}
              onPress={() => {
                setSelected(null);
                navigation.navigate('BikeDetail', { bike: selected });
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.unlockText}>View & Unlock</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  pin: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center', borderWidth: 2, borderColor: '#f97316', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  pinUnavailable: { borderColor: '#94a3b8', opacity: 0.7 },
  pinEmoji: { fontSize: 18 },
  pinBattery: { fontSize: 10, fontWeight: '700', color: '#1e293b' },
  card: { position: 'absolute', bottom: 32, left: 16, right: 16, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 8 },
  dismiss: { position: 'absolute', top: 14, right: 14, padding: 4 },
  dismissText: { fontSize: 16, color: '#94a3b8' },
  cardName: { fontSize: 20, fontWeight: '800', color: '#1e293b' },
  cardLocation: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  cardStat: { fontSize: 13, color: '#475569', marginRight: 12 },
  badge: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeAvailable: { backgroundColor: '#dcfce7' },
  badgeUnavailable: { backgroundColor: '#fee2e2' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  unlockButton: { backgroundColor: '#f97316', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  unlockText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
