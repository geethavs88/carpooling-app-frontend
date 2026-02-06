import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator();

function AuthStack({ handleLogin }) { // Accept handleLogin as a prop
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Pass the handleLogin function to the LoginScreen */}
            <Stack.Screen 
                name="Login" 
                component={(props) => <LoginScreen {...props} handleLogin={handleLogin} />} 
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

// function AuthStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Register" component={RegisterScreen} />
//         </Stack.Navigator>
//     );
// }

export default AuthStack;
