import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/home/HomeScreen';
import RideScheduleScreen from '../screens/home/RideScheduleScreen';
import DriveScheduleScreen from "../screens/home/DriveScheduleScreen";
import AvailableRidesScreen from "../screens/home/AvailableRidesScreen";
import RideDetailsScreen from "../screens/home/RideDetailsScreen";

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RideSchedule" component={RideScheduleScreen} />
            <Stack.Screen name="DriveSchedule" component={DriveScheduleScreen} />
            <Stack.Screen name="AvailableRides" component={AvailableRidesScreen} />
            <Stack.Screen name="RideDetails" component={RideDetailsScreen} />   
        </Stack.Navigator>
    );
}

export default HomeStack;
