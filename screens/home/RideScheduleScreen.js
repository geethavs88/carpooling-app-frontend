import { View, Text, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { useState, useContext } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../../context/AuthContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '../../config';

const GOOGLE_API_KEY = GOOGLE_MAPS_API_KEY;

function RideScheduleScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [startCoords, setStartCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);

    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [activePicker, setActivePicker] = useState(null);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const handleConfirmTime = (scheduleTime) => {
        if (activePicker === 'start') setStartTime(scheduleTime);
        else if (activePicker === 'end') setEndTime(scheduleTime);
        setActivePicker(null);
    };

    const buildLocalDateTime = (date, scheduleTime) => {
        const combined = new Date(date);
        combined.setHours(scheduleTime.getHours(), scheduleTime.getMinutes(), 0, 0);
        return combined;
    };

    const handleSearch = () => {
        if (!startLocation || !destination || !date || !startTime || !endTime) {
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
                startCoords,
                destinationCoords,
                startDateTime,
                endDateTime,
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}
        >
            <View style={styles.container}>
                {/* Start Location */}
                <View style={{ zIndex: 1000, elevation: 1000, marginBottom: 12 }}>
                    <GooglePlacesAutocomplete
                        placeholder="Start Location"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            setStartLocation(data.description);
                            setStartCoords({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                        }}
                        query={{ key: GOOGLE_API_KEY, language: 'en' }}
                        styles={autoCompleteStyles}
                        enablePoweredByContainer={false}
                        listViewDisplayed="auto"
                    />
                </View>

                {/* Destination */}
                <View style={{ zIndex: 999, elevation: 999, marginBottom: 12 }}>
                    <GooglePlacesAutocomplete
                        placeholder="Destination"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            setDestination(data.description);
                            setDestinationCoords({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                        }}
                        query={{ key: GOOGLE_API_KEY, language: 'en' }}
                        styles={autoCompleteStyles}
                        enablePoweredByContainer={false}
                        listViewDisplayed="auto"
                    />
                </View>

                {/* Map Preview */}
                {startCoords && destinationCoords && (
                    <View style={{ height: 200, marginBottom: 12 }}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: (startCoords.latitude + destinationCoords.latitude) / 2,
                                longitude: (startCoords.longitude + destinationCoords.longitude) / 2,
                                latitudeDelta: Math.abs(startCoords.latitude - destinationCoords.latitude) * 2.5,
                                longitudeDelta: Math.abs(startCoords.longitude - destinationCoords.longitude) * 2.5,
                            }}
                        >
                            <Marker coordinate={startCoords} title="Start" />
                            <Marker coordinate={destinationCoords} title="Destination" />
                        </MapView>
                    </View>
                )}

                {/* Date Picker */}
                <TouchableOpacity style={styles.dateTimePicker} onPress={showDatePicker}>
                    <Text>{date ? date.toDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />

                {/* Start Time */}
                <TouchableOpacity style={styles.dateTimePicker} onPress={() => setActivePicker('start')}>
                    <Text>{startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}</Text>
                </TouchableOpacity>

                {/* End Time */}
                <TouchableOpacity style={styles.dateTimePicker} onPress={() => setActivePicker('end')}>
                    <Text>{endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={!!activePicker}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={() => setActivePicker(null)}
                />

                <PrimaryButton onPress={handleSearch}>Find Available Rides</PrimaryButton>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    dateTimePicker: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
        backgroundColor: 'white'
    },
});

const autoCompleteStyles = {
    container: { flex: 0 },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
    listView: {
        position: 'absolute',
        top: 50,
        zIndex: 2000,
        elevation: 2000,
        backgroundColor: 'white',
    },
};

export default RideScheduleScreen;
