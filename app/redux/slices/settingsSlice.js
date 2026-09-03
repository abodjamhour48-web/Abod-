import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'ar', // العربية
  theme: 'light', // فاتح
  notifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  autoConnect: true,
  measurementUnit: 'mm', // ملم
  defaultWireType: 'stainless-steel',
  userPreferences: {
    showTutorials: true,
    autoSave: true,
    saveFrequency: 5, // كل 5 دقائق
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // تغيير اللغة
    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // تغيير المظهر
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // تفعيل/تعطيل الإخطارات
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    // تفعيل/تعطيل الصوت
    setSoundEnabled: (state, action) => {
      state.soundEnabled = action.payload;
    },

    // تفعيل/تعطيل الاهتزاز
    setVibrationEnabled: (state, action) => {
      state.vibrationEnabled = action.payload;
    },

    // الاتصال التلقائي
    setAutoConnect: (state, action) => {
      state.autoConnect = action.payload;
    },

    // تغيير وحدة القياس
    setMeasurementUnit: (state, action) => {
      state.measurementUnit = action.payload;
    },

    // تغيير نوع السلك الافتراضي
    setDefaultWireType: (state, action) => {
      state.defaultWireType = action.payload;
    },

    // تحديث تفضيلات المستخدم
    updateUserPreferences: (state, action) => {
      state.userPreferences = {
        ...state.userPreferences,
        ...action.payload,
      };
    },

    // إعادة تعيين الإعدادات
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  setLanguage,
  setTheme,
  setNotifications,
  setSoundEnabled,
  setVibrationEnabled,
  setAutoConnect,
  setMeasurementUnit,
  setDefaultWireType,
  updateUserPreferences,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
