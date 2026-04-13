import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BIKES } from '../data/bikes';
import { RootStackParamList } from '../../App';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionEmoji}>📷</Text>
        <Text style={styles.permissionTitle}>Camera Access Needed</Text>
        <Text style={styles.permissionSubtitle}>Scan the QR code on a bike to unlock it</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleBarCodeScanned({ data }: { data: string }) {
    if (scanned) return;
    setScanned(true);
    const bike = BIKES.find(b => b.id === data && b.available);
    if (bike) {
      navigation.navigate('BikeDetail', { bike });
    } else {
      Alert.alert('Not Found', 'No available bike found for this code.', [
        { text: 'Try Again', onPress: () => setScanned(false) },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Scan Bike QR Code</Text>
        <View style={styles.frame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
        <Text style={styles.hint}>Point at the QR code on the bike</Text>
        {scanned && (
          <TouchableOpacity style={styles.retryButton} onPress={() => setScanned(false)}>
            <Text style={styles.retryText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const FRAME = 240;
const CORNER = 24;
const THICKNESS = 4;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionContainer: { flex: 1, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', padding: 32 },
  permissionEmoji: { fontSize: 64, marginBottom: 16 },
  permissionTitle: { fontSize: 22, fontWeight: '800', color: '#1e293b', textAlign: 'center' },
  permissionSubtitle: { fontSize: 15, color: '#64748b', textAlign: 'center', marginTop: 8, marginBottom: 32 },
  permissionButton: { backgroundColor: '#f97316', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 40 },
  permissionButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 40, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  frame: { width: FRAME, height: FRAME, justifyContent: 'space-between' },
  corner: { position: 'absolute', width: CORNER, height: CORNER, borderColor: '#f97316' },
  topLeft: { top: 0, left: 0, borderTopWidth: THICKNESS, borderLeftWidth: THICKNESS },
  topRight: { top: 0, right: 0, borderTopWidth: THICKNESS, borderRightWidth: THICKNESS },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: THICKNESS, borderLeftWidth: THICKNESS },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: THICKNESS, borderRightWidth: THICKNESS },
  hint: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 40 },
  retryButton: { marginTop: 24, backgroundColor: '#f97316', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32 },
  retryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
