
import { View, Text, Button } from 'react-native';

function RegisterScreen({ navigation }) {
    return (
        <View>
            <Text>Register Screen</Text>
            <Button title="go back to login" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default RegisterScreen;
