import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BIKES, Bike } from '../data/bikes';
import { RootStackParamList } from '../../App';

type Props = {};

function BikeCard({ bike, onPress }: { bike: Bike; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.card, !bike.available && styles.cardDisabled]}
      onPress={onPress}
      disabled={!bike.available}
      activeOpacity={0.7}
    >
      <View style={styles.cardRow}>
        <Text style={styles.bikeIcon}>🚲</Text>
        <View style={[styles.cardInfo, { marginHorizontal: 12 }]}>
          <Text style={styles.bikeName}>{bike.name}</Text>
          <Text style={styles.bikeLocation}>{bike.location}</Text>
        </View>
        <View style={[styles.badge, bike.available ? styles.badgeAvailable : styles.badgeUnavailable]}>
          <Text style={styles.badgeText}>{bike.available ? 'Available' : 'In Use'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🐯 TigerBike</Text>
        <Text style={styles.subtitle}>{BIKES.filter(b => b.available).length} bikes nearby</Text>
      </View>
      <FlatList
        data={BIKES}
        keyExtractor={b => b.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <BikeCard
            bike={item}
            onPress={() => navigation.navigate('BikeDetail', { bike: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  logo: { fontSize: 26, fontWeight: '800', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 2 },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  cardDisabled: { opacity: 0.5 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  bikeIcon: { fontSize: 36 },
  cardInfo: { flex: 1 },
  bikeName: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  bikeLocation: { fontSize: 13, color: '#64748b', marginTop: 2, marginBottom: 6 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeAvailable: { backgroundColor: '#dcfce7' },
  badgeUnavailable: { backgroundColor: '#fee2e2' },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#374151' },
});
