import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../navigation/AuthContext';
import { BASE_URL } from '../../config';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users/login/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim() 
        }),
      });

      const data = await response.json();
      console.log('Login response:', response.status, data);

      if (response.ok) {
        login(data.username, data.user_id);
      } else {
        let errorMessage = 'Invalid credentials';
        
        if (data.non_field_errors) {
          errorMessage = data.non_field_errors[0];
        } else if (data.username) {
          errorMessage = Array.isArray(data.username) ? data.username[0] : data.username;
        } else if (data.password) {
          errorMessage = Array.isArray(data.password) ? data.password[0] : data.password;
        }
        
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
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




// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// // Set your Render backend URL here
// const BASE_URL = 'https://carpooling-backend-application.onrender.com/api';

// const LoginScreen = ({ navigation, setIsLoggedIn }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/users/login/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Login successful
//         setIsLoggedIn(true);
//       } else {
//         // Login failed
//         Alert.alert('Login Failed', data.detail || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
//       <View style={{ alignItems: 'center', paddingHorizontal: 25 }}>
//         <Text
//           style={{
//             fontFamily: 'Roboto-Medium',
//             fontSize: 28,
//             fontWeight: '500',
//             color: '#333',
//             marginBottom: 30
//           }}
//         >
//           Login 
//         </Text>

//         {/* Email */}
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#ccc',
//             borderBottomWidth: 1,
//             paddingBottom: 8,
//             marginBottom: 25,
//             alignItems: 'center'
//           }}
//         >
//           <MaterialIcons
//             name="alternate-email"
//             size={20}
//             color="#666"
//             style={{ marginRight: 5 }}
//           />
//           <TextInput
//             placeholder="Email ID"
//             style={{ flex: 1, paddingVertical: 0 }}
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//         {/* Password */}
//         <View
//           style={{
//             flexDirection: 'row',
//             borderBottomColor: '#ccc',
//             borderBottomWidth: 1,
//             paddingBottom: 8,
//             marginBottom: 25,
//             alignItems: 'center'
//           }}
//         >
//           <Ionicons
//             name="ios-lock-closed-outline"
//             size={20}
//             color="#666"
//             style={{ marginRight: 5 }}
//           />
//           <TextInput
//             placeholder="Password"
//             style={{ flex: 1, paddingVertical: 0 }}
//             secureTextEntry={true}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity>
//             <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
//               Forgot?
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           onPress={handleLogin}
//           style={{
//             backgroundColor: '#AD40AF',
//             padding: 20,
//             borderRadius: 10,
//             marginBottom: 30,
//             width: '100%',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontWeight: '700',
//                 fontSize: 16,
//                 color: '#fff'
//               }}
//             >
//               Login
//             </Text>
//           )}
//         </TouchableOpacity>

//         {/* Register */}
//         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//           <Text>New to the App?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//             <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;




