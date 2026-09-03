import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setConnected,
  setDeviceInfo,
  setConnectionError,
  disconnect,
} from '../redux/slices/machineSlice';

const BluetoothScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isConnected, deviceName } = useSelector(state => state.machine);
  const [devices, setDevices] = useState([
    { id: '1', name: 'Abod Wire Machine 1', rssi: -45, paired: true },
    { id: '2', name: 'Abod Wire Machine 2', rssi: -62, paired: false },
    { id: '3', name: 'Abod Wire Machine 3', rssi: -78, paired: false },
  ]);
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      Alert.alert('تم', 'تم فحص الأجهزة المتاحة');
    }, 3000);
  };

  const handleConnect = (device) => {
    setSelectedDevice(device);
    setTimeout(() => {
      dispatch(setDeviceInfo({ name: device.name, address: device.id }));
      dispatch(setConnected(true));
      Alert.alert('نجح', `تم الاتصال ب ${device.name}`);
      navigation.goBack();
    }, 1500);
  };

  const handleDisconnect = () => {
    dispatch(disconnect());
    setSelectedDevice(null);
    Alert.alert('تم', 'تم قطع الاتصال');
  };

  const getSignalStrength = (rssi) => {
    if (rssi > -50) return 'ممتاز';
    if (rssi > -70) return 'جيد';
    if (rssi > -80) return 'ضعيف';
    return 'سيء جداً';
  };

  const getSignalColor = (rssi) => {
    if (rssi > -50) return '#4CAF50';
    if (rssi > -70) return '#FF9800';
    if (rssi > -80) return '#F44336';
    return '#999';
  };

  const renderDevice = ({ item }) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceInfo}>
        <Icon name="bluetooth-audio" size={32} color="#1976D2" />
        <View style={styles.deviceDetails}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <View style={styles.signalContainer}>
            <View
              style={[
                styles.signalBars,
                { backgroundColor: getSignalColor(item.rssi) },
              ]}
            />
            <Text style={styles.signalText}>
              {getSignalStrength(item.rssi)} ({item.rssi} dBm)
            </Text>
          </View>
          {item.paired && (
            <View style={styles.pairedBadge}>
              <Icon name="check-circle" size={14} color="#4CAF50" />
              <Text style={styles.pairedText}>مقترن</Text>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.connectButton,
          {
            backgroundColor:
              isConnected && selectedDevice?.id === item.id ? '#F44336' : '#1976D2',
          },
        ]}
        onPress={() => {
          if (isConnected && selectedDevice?.id === item.id) {
            handleDisconnect();
          } else {
            handleConnect(item);
          }
        }}
      >
        <Text style={styles.connectButtonText}>
          {isConnected && selectedDevice?.id === item.id ? 'قطع' : 'اتصل'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* حالة الاتصال الحالية */}
      {isConnected && (
        <View style={styles.connectedBanner}>
          <Icon name="check-circle" size={24} color="#4CAF50" />
          <View style={styles.connectedText}>
            <Text style={styles.connectedTitle}>متصل</Text>
            <Text style={styles.connectedDevice}>{deviceName}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* زر الفحص */}
        <View style={styles.scanSection}>
          <TouchableOpacity
            style={[styles.scanButton, { opacity: scanning ? 0.6 : 1 }]}
            onPress={handleScan}
            disabled={scanning}
          >
            {scanning ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Icon name="bluetooth-searching" size={24} color="#fff" />
            )}
            <Text style={styles.scanButtonText}>
              {scanning ? 'جاري الفحص...' : 'فحص الأجهزة'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* قائمة الأجهزة */}
        <View style={styles.devicesSection}>
          <Text style={styles.sectionTitle}>الأجهزة المتاحة</Text>
          <FlatList
            data={devices}
            renderItem={renderDevice}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* الإعدادات المتقدمة */}
        <View style={styles.advancedSection}>
          <Text style={styles.sectionTitle}>الإعدادات المتقدمة</Text>

          <TouchableOpacity style={styles.advancedOption}>
            <Icon name="tune" size={24} color="#1976D2" />
            <Text style={styles.advancedOptionText}>تعيين MAC Address</Text>
            <Icon name="chevron-left" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.advancedOption}>
            <Icon name="history" size={24} color="#1976D2" />
            <Text style={styles.advancedOptionText}>الأجهزة المقترنة سابقاً</Text>
            <Icon name="chevron-left" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.advancedOption}>
            <Icon name="information" size={24} color="#1976D2" />
            <Text style={styles.advancedOptionText}>معلومات الاتصال</Text>
            <Icon name="chevron-left" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  connectedBanner: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectedText: {
    flex: 1,
  },
  connectedTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  connectedDevice: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scanSection: {
    padding: 12,
  },
  scanButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  devicesSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  deviceInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  signalBars: {
    width: 4,
    height: 12,
    borderRadius: 2,
  },
  signalText: {
    fontSize: 12,
    color: '#999',
  },
  pairedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  pairedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  advancedSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 24,
  },
  advancedOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  advancedOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default BluetoothScreen;
