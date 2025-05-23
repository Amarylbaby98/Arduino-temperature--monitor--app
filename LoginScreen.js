import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      console.log('Logging in user:', email);
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', user.user.uid);
      navigation.replace('Dashboard');
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={login} color="#0A84FF" />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, backgroundColor: '#f2f6ff'
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#0A84FF', marginBottom: 20
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, width: 250,
    marginBottom: 15, borderRadius: 5, backgroundColor: '#fff'
  },
  link: {
    marginTop: 15, color: '#007AFF', textDecorationLine: 'underline'
  }
});
