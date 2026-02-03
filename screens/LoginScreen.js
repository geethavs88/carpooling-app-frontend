import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Google from '../assets/google.png'
import Facebook from '../assets/facebook.png'
import Twitter from '../assets/Twitter.png'

const LoginScreen = ({ navigation }) => {
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

        {/* Email */}
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
            name="alternate-email"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email ID"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="email-address"
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
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />

          <TouchableOpacity>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
              Forgot?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
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

        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: 30
          }}
        >
          or, login with ...
        </Text>

        {/* Social Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
            width: '100%'
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10
            }}
          >
            <Image source={Google} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10
            }}
          >
            <Image source={Facebook} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10
            }}
          >
            <Image source={Twitter} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        {/* Register */}
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
