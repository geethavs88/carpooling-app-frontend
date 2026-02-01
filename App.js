import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RideScheduleScreen from './screens/RideScheduleScreen';
import DriveScheduleScreen from './screens/DriveScheduleScreen';
import MyCommutesScreen from './screens/MyCommutesScreen';
import ProfileScreen from './screens/ProfileScreen';
import AvailableRidesScreen from './screens/AvailableRidesScreen';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomeScreen}/>
        <Stack.Screen name="ScheduleRide" component={RideScheduleScreen}/>
        <Stack.Screen name="ScheduleDrive" component={DriveScheduleScreen}/>
        <Stack.Screen name="MyCommutes" component={MyCommutesScreen}/>
        <Stack.Screen name="MyProfile" component={ProfileScreen}/>
        <Stack.Screen name="AvailableRides" component={AvailableRidesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

});

