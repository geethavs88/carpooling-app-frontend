import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";

function RideScheduleScreen({ navigation }) {

    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [activePicker, setActivePicker] = useState(null); 


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };
    const handleConfirmTime = (scheduleTime) => {
        if (activePicker === 'start') {
            setStartTime(scheduleTime);
            console.log("Start Time: ", scheduleTime);
        } else if (activePicker === 'end') {
            setEndTime(scheduleTime);
            console.log("End Time: ", scheduleTime);
        }
        setActivePicker(null);
    };
    const buildLocalDateTime = (date, scheduleTime) => {
        const combined = new Date(date);
        combined.setHours(scheduleTime.getHours(), scheduleTime.getMinutes(), 0, 0);
        console.warn("Combined DateTime: ", combined);
        return combined;
    };

    const handleSearch = () => {
        if (!startLocation || !destination || !date || !startTime || !endTime) {
            // Show an error message or handle the case where fields are empty
            alert('Please fill in all fields before searching for rides.');
            return;
        }

        if (endTime <= startTime) {
            alert('End time must be after start time.');
            return;
        }

        const startDateTime = buildLocalDateTime(date, startTime);
        const endDateTime = buildLocalDateTime(date, endTime);

        navigation.navigate('AvailableRides', {
            search: {
                startLocation,
                destination,
                startDateTime,
                endDateTime
            }
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
            <TouchableOpacity style={styles.dateTimePicker} onPress={showDatePicker}>
                <Text>
                    {date ? date.toDateString() : 'Select Date'}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

           {/* Start Time */}
            <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setActivePicker('start')}
            >
            <Text>
                {startTime
                ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Select Start Time'}
            </Text>
            </TouchableOpacity>

            {/* End Time */}
            <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setActivePicker('end')}
            >
            <Text>
                {endTime
            ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'Select End Time'}
            </Text>
            </TouchableOpacity>

            <DateTimePickerModal
            isVisible={!!activePicker}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={() => setActivePicker(null)}
            />

            <PrimaryButton onPress={handleSearch}>Find Available Rides </PrimaryButton>
    </View>
    );
}
const styles = StyleSheet.create({
    rideScheduleInputContainer: {
        flex:1,
        padding:8
    },
    dateTimePicker: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
    },
}
);
export default RideScheduleScreen;
