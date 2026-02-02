import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

function RideScheduleScreen() {
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    return (
        <View style={styles.rideScheduleInputContainer}>
            <Text>Ride Schedule</Text>
            <InputField
                placeholder="Start Location"
                value={startLocation}
                onChangeText={setStartLocation}
            />
            <InputField
                placeholder="Destination"
                value={destination}
                onChangeText={setDestination}
            />
            <InputField
                placeholder="Date"
                value={date}
                onChangeText={setDate}
            />
            <InputField
                placeholder="Time"
                value={time}
                onChangeText={setTime}
            />
            <PrimaryButton onPress={() => {}}>Find Available Rides </PrimaryButton>
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
