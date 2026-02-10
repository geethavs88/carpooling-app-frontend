import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { BASE_URL } from '../../config';

/* Input Field Component */
const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default'
}) => (
  <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20 }}>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={secureTextEntry ? 'none' : 'words'}
      style={{ padding: 10, fontSize: 16 }}
    />
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('Starting registration...');
    
    if (
      !firstName ||
      !lastName ||
      !username ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      username: username.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmpassword: confirmPassword.trim()  // ✅ lowercase to match Django
    };

    console.log('Payload:', { ...payload, password: '***', confirmpassword: '***' });

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Registration response:', response.status, data);

      if (response.ok) {
        // Clear password fields
        setPassword('');
        setConfirmPassword('');
        
        Alert.alert(
          'Success', 
          `Account created for ${username}! You can now login.`,
          [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
          ]
        );
      } else {
        let errorMessage = 'Registration failed';
        
        if (data.username) {
          errorMessage = `Username: ${Array.isArray(data.username) ? data.username[0] : data.username}`;
        } else if (data.email) {
          errorMessage = `Email: ${Array.isArray(data.email) ? data.email[0] : data.email}`;
        } else if (data.password) {
          errorMessage = `Password: ${Array.isArray(data.password) ? data.password[0] : data.password}`;
        } else if (data.phone) {
          errorMessage = `Phone: ${Array.isArray(data.phone) ? data.phone[0] : data.phone}`;
        } else if (data.detail) {
          errorMessage = data.detail;
        }
        
        Alert.alert('Registration Error', errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#fff'
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
        Register
      </Text>

      <InputField 
        placeholder="First Name *" 
        value={firstName} 
        onChangeText={setFirstName} 
      />
      <InputField 
        placeholder="Last Name *" 
        value={lastName} 
        onChangeText={setLastName} 
      />
      <InputField 
        placeholder="Username *" 
        value={username} 
        onChangeText={setUsername} 
      />
      <InputField 
        placeholder="Phone *" 
        value={phone} 
        onChangeText={setPhone} 
        keyboardType="phone-pad" 
      />
      <InputField 
        placeholder="Email *" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
      />
      <InputField 
        placeholder="Password *" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <InputField 
        placeholder="Confirm Password *" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry 
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#AD40AF',
          padding: 18,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Register</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#AD40AF', fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;