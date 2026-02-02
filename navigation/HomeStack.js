import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/home/HomeScreen';
import RideScheduleScreen from '../screens/home/RideScheduleScreen';
import DriveScheduleScreen from "../screens/home/DriveScheduleScreen";
import AvailableRidesScreen from "../screens/home/AvailableRidesScreen";
import RideDetailsScreen from "../screens/home/RideDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyCommutesScreen from "../screens/MyCommutesScreen";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RideSchedule" component={RideScheduleScreen} />
            <Stack.Screen name="DriveSchedule" component={DriveScheduleScreen} />
            <Stack.Screen name="AvailableRides" component={AvailableRidesScreen} />
            <Stack.Screen name="RideDetails" component={RideDetailsScreen} />  
            <Stack.Screen name="MyProfile" component={ProfileScreen} /> 
            <Stack.Screen name="MyCommutes" component={MyCommutesScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack;
