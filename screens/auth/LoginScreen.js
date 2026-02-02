import { View, Text, Button } from 'react-native';

function LoginScreen({ navigation }) {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button title="go to register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

export default LoginScreen;