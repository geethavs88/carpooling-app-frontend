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




// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
// import { BASE_URL } from './backendconfig.js'; 

// const RegisterScreen = ({ navigation }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!username || !password || !confirmPassword || !email || !firstName || !lastName || !phone) {
//       Alert.alert('Error', 'Please fill all required fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     const payload = { 
//       first_name: firstName, 
//       last_name: lastName, 
//       username, 
//       phone, 
//       email, 
//       password,
//       confirmPassword
//     };

//     setLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/users/register/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       console.log('Registration response:', data);

//       if (response.ok) {
//         Alert.alert('Success', 'Registered successfully!', [
//           { text: 'OK', onPress: () => navigation.navigate('Login') }
//         ]);
//       } else {
//         let errorMessage = 'Registration failed';
        
//         if (data.username) {
//           errorMessage = `Username: ${data.username[0]}`;
//         } else if (data.email) {
//           errorMessage = `Email: ${data.email[0]}`;
//         } else if (data.password) {
//           errorMessage = `Password: ${data.password[0]}`;
//         } else if (data.detail) {
//           errorMessage = data.detail;
//         }
        
//         Alert.alert('Error', errorMessage);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const InputField = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) => (
//     <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20 }}>
//       <TextInput
//         placeholder={placeholder}
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={secureTextEntry}
//         keyboardType={keyboardType}
//         style={{ padding: 10, fontSize: 16 }}
//       />
//     </View>
//   );

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 40 }}>
//       <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30 }}>Register</Text>

//       <InputField placeholder="First Name *" value={firstName} onChangeText={setFirstName} />
//       <InputField placeholder="Last Name *" value={lastName} onChangeText={setLastName} />
//       <InputField placeholder="Username *" value={username} onChangeText={setUsername} />
//       <InputField placeholder="Phone *" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
//       <InputField placeholder="Email *" value={email} onChangeText={setEmail} keyboardType="email-address" />
//       <InputField placeholder="Password *" value={password} onChangeText={setPassword} secureTextEntry />
//       <InputField placeholder="Confirm Password *" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

//       <TouchableOpacity
//         onPress={handleRegister}
//         disabled={loading}
//         style={{ 
//           backgroundColor: loading ? '#ccc' : '#AD40AF', 
//           padding: 15, 
//           borderRadius: 10, 
//           alignItems: 'center', 
//           marginTop: 20 
//         }}
//       >
//         {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>Register</Text>}
//       </TouchableOpacity>

//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
//         <Text>Already have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={{ color: '#AD40AF', fontWeight: 'bold' }}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default RegisterScreen;





// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert
// } from 'react-native'
// import { MaterialIcons, Ionicons } from '@expo/vector-icons'
// import { SafeAreaView } from 'react-native-safe-area-context'

// const RegisterScreen = ({ navigation }) => {
//   // State for input fields
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [username, setUsername] = useState('')
//   const [phone, setPhone] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')

//   // Handle registration
//   const handleRegister = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match')
//       return
//     }

//     const payload = {
//       first_name: firstName,
//       last_name: lastName,
//       username: username,
//       phone: phone,
//       email: email,
//       password: password,
//       confirmpassword: confirmPassword
//     }

//     try {
//       const response = await fetch('https://carpooling-backend-application.onrender.com/api/users/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       })

//       const data = await response.json()

//       if (response.ok) {
//         Alert.alert('Success', data.message)
//         navigation.navigate('Login') // Navigate to login on success
//       } else {
//         // Show validation or backend errors
//         Alert.alert('Error', JSON.stringify(data))
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again.')
//       console.error(error)
//     }
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
//       <View style={{ alignItems: 'center', paddingHorizontal: 25 }}>
//         <Text style={{
//           fontSize: 28,
//           fontWeight: '500',
//           color: '#333',
//           marginBottom: 30
//         }}>Register</Text>

//         {/* First Name */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <MaterialIcons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="First Name" style={{ flex: 1, paddingVertical: 0 }} value={firstName} onChangeText={setFirstName} />
//         </View>

//         {/* Last Name */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <MaterialIcons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="Last Name" style={{ flex: 1, paddingVertical: 0 }} value={lastName} onChangeText={setLastName} />
//         </View>

//         {/* Username */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <MaterialIcons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="User Name" style={{ flex: 1, paddingVertical: 0 }} value={username} onChangeText={setUsername} />
//         </View>

//         {/* Phone */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <MaterialIcons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="Phone" style={{ flex: 1, paddingVertical: 0 }} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
//         </View>

//         {/* Email */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="Email ID" style={{ flex: 1, paddingVertical: 0 }} value={email} onChangeText={setEmail} keyboardType="email-address" />
//         </View>

//         {/* Password */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25, alignItems: 'center' }}>
//           <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="Password" style={{ flex: 1, paddingVertical: 0 }} secureTextEntry value={password} onChangeText={setPassword} />
//         </View>

//         {/* Confirm Password */}
//         <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 30, alignItems: 'center' }}>
//           <Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />
//           <TextInput placeholder="Confirm Password" style={{ flex: 1, paddingVertical: 0 }} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
//         </View>

//         {/* Register Button */}
//         <TouchableOpacity style={{ backgroundColor: '#AD40AF', padding: 20, borderRadius: 10, marginBottom: 30, width: '100%' }} onPress={handleRegister}>
//           <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Register</Text>
//         </TouchableOpacity>

//         {/* Login Link */}
//         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//           <Text>Already have an account?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   )
// }


// export default RegisterScreen
