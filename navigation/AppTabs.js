import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyCommutesScreen from '../screens/MyCommutesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home', headerShown: false }} />
            <Tab.Screen name="My Commutes" component={MyCommutesScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default AppTabs;