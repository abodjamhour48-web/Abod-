import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnected: false,
  deviceName: null,
  deviceAddress: null,
  batteryLevel: null,
  firmwareVersion: null,
  machineStatus: 'idle', // idle, running, paused, error
  currentOperation: null,
  temperature: null,
  motorSpeed: 0,
  bendingProgress: 0,
  bendingHistory: [],
  diagnostics: {
    motorHealth: 'good',
    sensorStatus: 'ok',
    batteryHealth: 'good',
  },
  lastConnectedTime: null,
  connectionError: null,
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    // تعيين حالة الاتصال
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },

    // تعيين بيانات الجهاز
    setDeviceInfo: (state, action) => {
      state.deviceName = action.payload.name;
      state.deviceAddress = action.payload.address;
      state.lastConnectedTime = new Date().toISOString();
    },

    // تحديث مستوى البطارية
    setBatteryLevel: (state, action) => {
      state.batteryLevel = action.payload;
    },

    // تحديث إصدار البرنامج الثابت
    setFirmwareVersion: (state, action) => {
      state.firmwareVersion = action.payload;
    },

    // تحديث حالة الآلة
    setMachineStatus: (state, action) => {
      state.machineStatus = action.payload;
    },

    // تعيين العملية الحالية
    setCurrentOperation: (state, action) => {
      state.currentOperation = action.payload;
    },

    // تحديث درجة الحرارة
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },

    // تحديث سرعة المحرك
    setMotorSpeed: (state, action) => {
      state.motorSpeed = action.payload;
    },

    // تحديث تقدم الثني
    setBendingProgress: (state, action) => {
      state.bendingProgress = action.payload;
    },

    // إضافة عملية ثني للسجل
    addBendingRecord: (state, action) => {
      state.bendingHistory.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },

    // تحديث معلومات التشخيص
    updateDiagnostics: (state, action) => {
      state.diagnostics = {
        ...state.diagnostics,
        ...action.payload,
      };
    },

    // تعيين خطأ الاتصال
    setConnectionError: (state, action) => {
      state.connectionError = action.payload;
    },

    // إعادة تعيين حالة الآلة
    resetMachineState: (state) => {
      return {
        ...initialState,
        lastConnectedTime: state.lastConnectedTime,
      };
    },

    // قطع الاتصال
    disconnect: (state) => {
      state.isConnected = false;
      state.machineStatus = 'idle';
      state.currentOperation = null;
      state.motorSpeed = 0;
      state.bendingProgress = 0;
    },
  },
});

export const {
  setConnected,
  setDeviceInfo,
  setBatteryLevel,
  setFirmwareVersion,
  setMachineStatus,
  setCurrentOperation,
  setTemperature,
  setMotorSpeed,
  setBendingProgress,
  addBendingRecord,
  updateDiagnostics,
  setConnectionError,
  resetMachineState,
  disconnect,
} = machineSlice.actions;

export default machineSlice.reducer;
