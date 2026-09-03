import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setMachineStatus,
  setMotorSpeed,
  setBendingProgress,
  addBendingRecord,
} from '../redux/slices/machineSlice';

const MachineControlScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isConnected, machineStatus, motorSpeed, bendingProgress } = useSelector(
    state => state.machine
  );
  const [speedValue, setSpeedValue] = useState(motorSpeed);
  const progressAnim = new Animated.Value(bendingProgress);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: bendingProgress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [bendingProgress]);

  const handleConnect = () => {
    navigation.navigate('Bluetooth');
  };

  const handleStart = () => {
    if (!isConnected) {
      Alert.alert('تنبيه', 'الرجاء الاتصال بالآلة أولاً');
      return;
    }
    dispatch(setMachineStatus('running'));
    dispatch(setMotorSpeed(50));
  };

  const handlePause = () => {
    dispatch(setMachineStatus('paused'));
    dispatch(setMotorSpeed(0));
  };

  const handleStop = () => {
    dispatch(setMachineStatus('idle'));
    dispatch(setMotorSpeed(0));
    dispatch(setBendingProgress(0));
    dispatch(addBendingRecord({
      duration: 0,
      status: 'completed',
      wireType: 'stainless-steel',
    }));
  };

  const handleSpeedChange = (value) => {
    setSpeedValue(value);
    dispatch(setMotorSpeed(value));
  };

  const getStatusColor = () => {
    switch (machineStatus) {
      case 'running':
        return '#4CAF50';
      case 'paused':
        return '#FF9800';
      case 'error':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getStatusText = () => {
    switch (machineStatus) {
      case 'running':
        return 'قيد التشغيل';
      case 'paused':
        return 'موقوفة';
      case 'error':
        return 'خطأ';
      default:
        return 'معطلة';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* حالة الاتصال */}
      <View style={styles.connectionCard}>
        <View style={styles.connectionStatus}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConnected ? '#4CAF50' : '#999' },
            ]}
          />
          <Text style={styles.connectionText}>
            {isConnected ? 'متصل' : 'غير متصل'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={handleConnect}
        >
          <Icon name="bluetooth" size={20} color="#1976D2" />
          <Text style={styles.connectButtonText}>
            {isConnected ? 'إدارة الاتصال' : 'الاتصال'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* حالة الآلة */}
      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>حالة الآلة</Text>
        <View style={styles.statusDisplay}>
          <View
            style={[
              styles.statusCircle,
              { borderColor: getStatusColor() },
            ]}
          >
            <Text style={[styles.statusValue, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
      </View>

      {/* التحكم بالسرعة */}
      <View style={styles.controlCard}>
        <Text style={styles.cardTitle}>سرعة المحرك</Text>
        <View style={styles.speedDisplay}>
          <Text style={styles.speedValue}>{speedValue}%</Text>
        </View>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.speedButton}
            onPress={() => handleSpeedChange(Math.max(0, speedValue - 10))}
          >
            <Icon name="minus" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.speedBar}>
            <View
              style={[
                styles.speedProgress,
                { width: `${speedValue}%` },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.speedButton}
            onPress={() => handleSpeedChange(Math.min(100, speedValue + 10))}
          >
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* تقدم الثني */}
      <View style={styles.controlCard}>
        <Text style={styles.cardTitle}>تقدم الثني</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{bendingProgress}%</Text>
        </View>
      </View>

      {/* أزرار التحكم */}
      <View style={styles.controlsCard}>
        <Text style={styles.cardTitle}>التحكم</Text>
        <View style={styles.buttonsGrid}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              {
                backgroundColor:
                  machineStatus === 'running' ? '#ccc' : '#4CAF50',
              },
            ]}
            onPress={handleStart}
            disabled={machineStatus === 'running'}
          >
            <Icon name="play" size={28} color="#fff" />
            <Text style={styles.controlButtonText}>تشغيل</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              {
                backgroundColor:
                  machineStatus === 'paused' ? '#ccc' : '#FF9800',
              },
            ]}
            onPress={handlePause}
            disabled={machineStatus === 'paused'}
          >
            <Icon name="pause" size={28} color="#fff" />
            <Text style={styles.controlButtonText}>إيقاف مؤقت</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              { backgroundColor: machineStatus === 'idle' ? '#ccc' : '#F44336' },
            ]}
            onPress={handleStop}
            disabled={machineStatus === 'idle'}
          >
            <Icon name="stop" size={28} color="#fff" />
            <Text style={styles.controlButtonText}>إيقاف</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* خيارات متقدمة */}
      <View style={styles.advancedCard}>
        <Text style={styles.cardTitle}>خيارات متقدمة</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="tune" size={24} color="#1976D2" />
          <Text style={styles.optionButtonText}>المعايرة</Text>
          <Icon name="chevron-left" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="wrench" size={24} color="#1976D2" />
          <Text style={styles.optionButtonText}>الصيانة</Text>
          <Icon name="chevron-left" size={20} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="alert-circle" size={24} color="#1976D2" />
          <Text style={styles.optionButtonText}>التشخيص</Text>
          <Icon name="chevron-left" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  connectionCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  connectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    gap: 6,
  },
  connectButtonText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statusDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statusCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  speedDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  speedValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  speedButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  speedProgress: {
    height: '100%',
    backgroundColor: '#1976D2',
  },
  progressContainer: {
    gap: 12,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  controlsCard: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  advancedCard: {
    backgroundColor: '#fff',
    margin: 12,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
  },
  optionButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default MachineControlScreen;
