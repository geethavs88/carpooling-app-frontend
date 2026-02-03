import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  
} from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = ({ navigation }) => {
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
          Register
        </Text>

        {/* Name */}
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
            placeholder="First Name"
            style={{ flex: 1, paddingVertical: 0 }}
          />
        </View>

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
            placeholder="Last Name"
            style={{ flex: 1, paddingVertical: 0 }}
          />
        </View>

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
            placeholder="User Name"
            style={{ flex: 1, paddingVertical: 0 }}
          />
        </View>

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
            placeholder="Phone"
            style={{ flex: 1, paddingVertical: 0 }}
          />
        </View>

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
        </View>

        {/* Confirm Password */}
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
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
            placeholder="Confirm Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
          />
        </View>

        {/* Register Button */}
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
            Register
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
              {' '}Login
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen
