import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";


function DriveScheduleScreen({ navigation }) {
 
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [activePicker, setActivePicker] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(0);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const showTimePicker = (type) => setActivePicker(type);
    const hideTimePicker = () => setActivePicker(null);

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date);
        hideDatePicker();
    };
    const handleConfirmTime = (selectedTime) => {
        if (activePicker === 'start') {
            setStartTime(selectedTime);
        } else if (activePicker === 'end') {
            setEndTime(selectedTime);
        }
        setActivePicker(null);
    };
    const buildLocalDateTime = (date, scheduleTime) => {
        const combined = new Date(date);
        combined.setHours(scheduleTime.getHours(), scheduleTime.getMinutes(), 0, 0);
        console.log("Combined DateTime: ", combined);
        return combined;
    };

    const handleSearch = () => {
        if (!startLocation || !destination || !date || !startTime || !endTime || availableSeats <= 0) {
            alert('Please fill in all fields before searching for rides.');
            return;
        }

        if (endTime <= startTime) {
            alert('End time must be after start time.');
            return;
        }

        const localStartTime = buildLocalDateTime(date, startTime);
        const localEndTime = buildLocalDateTime(date, endTime);

        console.log("Local Start Time: ", localStartTime);
        console.log("Local End Time: ", localEndTime);

        // Navigate to the Available Rides screen with the search parameters
        navigation.navigate('AvailableRideRequests', {
            search: {
                startLocation,
                destination,
                startDateTime: localStartTime.toISOString(),
                endDateTime: localEndTime.toISOString(),
                availableSeats
            }
        });
    };

    return(
        <View>
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
            onPress={() => {
                showTimePicker('start');
            }}>
                <Text>
                    {startTime ? startTime.toLocaleTimeString() : 'Select Start Time'}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={activePicker === 'start'}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />

            {/* End Time */}
            <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => {
                showTimePicker('end');
            }}>
        
                <Text>
                    {endTime ? endTime.toLocaleTimeString() : 'Select End Time'}
                </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={activePicker === 'end'}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />

            <InputField
                placeholder="Available Seats"
                value={availableSeats}
                onChangeText={(text) => setAvailableSeats(Number(text))}
                keyboardType="numeric"
            />

            <PrimaryButton onPress={handleSearch} >Find Available Ride Requests</PrimaryButton>
        </View>
    );
}

const styles = StyleSheet.create({
    driveScheduleInputContainer: {
        flex: 1,
        padding: 16
    },
    dateTimePicker: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
        
    },

});
export default DriveScheduleScreen;