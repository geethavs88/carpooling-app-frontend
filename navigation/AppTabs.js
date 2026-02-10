import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyCommutesScreen from '../screens/MyCommutesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,

            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'My Commutes') {
                iconName = focused ? 'car' : 'car-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: '#AD40AF',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
            height: 60,
            paddingBottom: 6,
            },
            tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            },
        })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
            />

            <Tab.Screen
                name="My Commutes"
                component={MyCommutesScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
    }

    export default AppTabs;