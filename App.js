import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SQLitePOSScreen from './src/screens/SQLitePOSScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SQLitePOSScreen />
    </SafeAreaProvider>
  );
}
