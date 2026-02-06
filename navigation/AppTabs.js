import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import AuthStck from './AuthStack'
import MyCommutesScreen from '../screens/MyCommutesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen'
// import HomeScreen from '../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

function AppTabs() {
    return (
    //     <Stack.Navigator initialRouteName="Login">
    //   <Stack.Screen name="Carpool" component={LoginScreen} />
    //   <Stack.Screen name="Register" component={RegisterScreen} />
    //   <Stack.Screen name="Home" component={HomeScreen} />
    // </Stack.Navigator>

        <Tab.Navigator>
            
            <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home', headerShown: false }} />
            <Tab.Screen name="My Commutes" component={MyCommutesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default AppTabs;
