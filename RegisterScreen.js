import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    
    try {
      console.log('Attempting to register user:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user.uid);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date()
      });
      Alert.alert('✅ Registration Successful', 'Welcome!');
      navigation.replace('Dashboard');
    } catch (error) {
      console.log('Register error:', error);
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>
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
      <Button title="Register" onPress={register} color="#34C759" />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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
