import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

function RideScheduleScreen({ navigation }) {
    const MOCK_DRIVER_RIDES = [
  {
    id: 1,
    driver: 'Alice',
    start: 'Downtown',
    end: 'Airport',
    date: '2026-02-10',
    timeSlot: '9-11 AM',
    seats: 2,
  },
  {
    id: 2,
    driver: 'Bob',
    start: 'Downtown',
    end: 'Airport',
    date: '2026-02-10',
    timeSlot: '11-1 PM',
    seats: 1,
  },
];
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const handleSearch = () => {
        if (!startLocation || !destination || !date || !timeSlot) {
            // Show an error message or handle the case where fields are empty
            alert('Please fill in all fields before searching for rides.');
            return;
        }
        // Implement search functionality here
        const results= MOCK_DRIVER_RIDES.filter((ride) =>
                ride.start.toLowerCase() === startLocation.toLowerCase() &&
                ride.end.toLowerCase() === destination.toLowerCase() &&
                ride.date === date &&
                ride.timeSlot === timeSlot
            )   
        navigation.navigate('AvailableRides', {
            search: {
                startLocation,
                destination,
                date,
                timeSlot
            },
            rides: results
        });
    };

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
                value={timeSlot}
                onChangeText={setTimeSlot}
            />
            <PrimaryButton onPress={handleSearch}>Find Available Rides </PrimaryButton>
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
