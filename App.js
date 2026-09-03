import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './app/redux/store';
import Navigation from './app/navigation/Navigation';

export default function App() {
  useEffect(() => {
    // تهيئة التطبيق
    console.log('🚀 تطبيق ثني أسلاك تقويم الأسنان قيد التشغيل');
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Navigation />
      <Toast />
    </Provider>
  );
}
