import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ℹ️ About This App</Text>
      <Text style={styles.text}>
        This mobile app connects to an Arduino Uno R4 WiFi system that uses a DS18B20 temperature sensor and a Peltier module
        to regulate heating and cooling. Users can view real-time temperature readings, toggle the system on/off, and visualize
        sensor history in a live chart.
      </Text>
      <Text style={styles.text}>
        The app also supports user authentication, Firebase data logging, and is styled for both light and dark mode compatibility.
        It's built using React Native and Expo, making it lightweight and cross-platform.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f6ff'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0A84FF',
    marginBottom: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20
  }
});
