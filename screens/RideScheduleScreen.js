import { View, Text, StyleSheet } from 'react-native';
function RideScheduleScreen() {
    return (
        <View style={styles.rideScheduleInputContainer}>
            <Text>Ride Schedule</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    rideScheduleInputContainer: {
        flex:1,
        padding:8


    }
    

}
);
export default RideScheduleScreen;
