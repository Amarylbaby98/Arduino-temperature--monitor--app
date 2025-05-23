import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/thermometer.png')} style={styles.image} />
      <Text style={styles.title}>🌡️ Temp Monitor App</Text>
      <Text style={styles.subtitle}>Monitor and Control Arduino</Text>
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} color="#0A84FF" />
        <View style={{ height: 10 }} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} color="#FF9500" />
        <View style={{ height: 10 }} />
        <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} color="#34C759" />
        <View style={{ height: 10 }} />
        <Button title="About Us" onPress={() => navigation.navigate('About')} color="#FF9F0A" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f2f6ff' },
  image: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#0A84FF', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, color: '#333' },
  buttonGroup: {
    width: '80%',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});
