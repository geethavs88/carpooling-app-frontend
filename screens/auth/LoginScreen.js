import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  } from 'react-native'
import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { login } from '../../api/login';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../context/AuthContext';


const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const handleLogin = async () => {
    // Perform login logic here
    // On successful login, update the state
    if (!username || !password) {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }
    setLoading(true);
    try {
        const res = await login(username,password);
        setUser({
          id: res.user_id,
          username: res.username
        })
        console.log('User logged in:', res);

      // navigation.replace('Home', { user });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login failed', 'Invalid credentials');
    }
    finally {
      setLoading(false);
    }
    // setIsLoggedIn(true);
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
        Login
      </Text>

      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          padding: 15, 
          borderRadius: 8, 
          marginBottom: 15,
          fontSize: 16
        }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ccc', 
          padding: 15, 
          borderRadius: 8, 
          marginBottom: 20,
          fontSize: 16
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{ 
          backgroundColor: loading ? '#ccc' : '#AD40AF', 
          padding: 18, 
          borderRadius: 8, 
          alignItems: 'center' 
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#AD40AF', fontWeight: 'bold' }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
