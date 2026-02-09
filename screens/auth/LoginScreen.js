import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  } from 'react-native'
import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { login } from '../../api/login';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../context/AuthContext';


const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const { setUser } = useContext(AuthContext);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const handleLogin = async () => {
    // Perform login logic here
    // On successful login, update the state
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
    
    // setIsLoggedIn(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', paddingHorizontal: 25 }}>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30
          }}
        >
          Login 
        </Text>

        {/* username */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
            alignItems: 'center'
          }}
        >
          <MaterialIcons
            name="person-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="username"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="default"
            onChangeText={setUsername}
          />
        </View>

        {/* Password */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
            alignItems: 'center'
          }}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>

       
        <TouchableOpacity onPress={handleLogin}
          style={{
            backgroundColor: '#AD40AF',
            padding: 20,
            borderRadius: 10,
            marginBottom: 30,
            width: '100%'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff'
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>New to the App?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
            </TouchableOpacity>
            </View>

      </View>
    </SafeAreaView>
  )
}

export default LoginScreen
