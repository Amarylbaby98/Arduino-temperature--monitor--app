// screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, SafeAreaView, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function DashboardScreen({ navigation }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [temperature, setTemperature] = useState(0);
  const [history, setHistory] = useState([]);
  const [ip, setIp] = useState('');
  const [connected, setConnected] = useState(false);

  const fetchTemperature = async () => {
    try {
      console.log(`Trying to fetch from http://${ip}/temperature`);
      const res = await fetch(`http://${ip}/temperature`);
      const json = await res.json();
      const temp = parseFloat(json.temperature);
      console.log('Fetched temperature:', temp);

      if (!isNaN(temp) && isFinite(temp) && temp !== -127) {
        setTemperature(temp);
        setHistory(prev => [...prev.slice(-9), temp]);

        await addDoc(collection(db, 'temperatureLogs'), {
          uid: auth.currentUser?.uid || 'guest',
          temperature: temp,
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('Fetch failed:', err.message);
      Alert.alert('Error', 'Could not reach Arduino device.');
    }
  };

  useEffect(() => {
    if (connected) {
      const interval = setInterval(fetchTemperature, 5000);
      return () => clearInterval(interval);
    }
  }, [connected]);

  const togglePeltier = async (state) => {
    try {
      await fetch(`http://${ip}/peltier/${state ? 'on' : 'off'}`);
    } catch {
      Alert.alert('Error', 'Failed to toggle Peltier.');
    }
  };

  const backgroundColor = isDark ? '#1e1e1e' : '#f2f6ff';
  const textColor = isDark ? '#fff' : '#000';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: textColor }]}>📊 Dashboard</Text>
      {!connected ? (
        <>
          <TextInput
            placeholder="Enter Arduino IP"
            style={[styles.input, { color: textColor, borderColor: '#aaa' }]}
            onChangeText={setIp}
            value={ip}
            keyboardType="numeric"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
          />
          <Button title="Connect" onPress={() => setConnected(true)} color="#0A84FF" />
        </>
      ) : (
        <>
          <Text style={[styles.temp, { color: textColor }]}>Current Temperature: {temperature.toFixed(2)} °C</Text>
          {history.length > 0 && (
            <LineChart
              data={{
                labels: Array(history.length).fill(''),
                datasets: [{ data: history }]
              }}
              width={320}
              height={240}
              chartConfig={{
                backgroundGradientFrom: backgroundColor,
                backgroundGradientTo: backgroundColor,
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(10, 132, 255, ${opacity})`,
                labelColor: () => textColor
              }}
              bezier
              style={styles.chart}
            />
          )}

          <View style={styles.buttons}>
            <Button title="Peltier ON" onPress={() => togglePeltier(true)} color="#34C759" />
            <Button title="Peltier OFF" onPress={() => togglePeltier(false)} color="#FF3B30" />
            <Button title="History" onPress={() => navigation.navigate('History')} color="#0A84FF" />
            <Button title="Logout" onPress={() => navigation.replace('Login')} color="#5856D6" />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, width: 250, borderRadius: 6 },
  temp: { fontSize: 18, marginBottom: 10 },
  chart: { marginVertical: 20 },
  buttons: { gap: 15, width: 250 }
});
