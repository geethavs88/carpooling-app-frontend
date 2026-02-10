import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../../context/AuthContext';
import { GOOGLE_MAPS_API_KEY } from '../../config'; // your API key
import MapView, { Marker } from 'react-native-maps';
const GOOGLE_API_KEY = GOOGLE_MAPS_API_KEY;

function DriveScheduleScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [startCoords, setStartCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
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
                startCoords,
                destinationCoords,
                startDateTime: localStartTime.toISOString(),
                endDateTime: localEndTime.toISOString(),
                availableSeats
            }
        });
    };

    return(

        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.container}
                    nestedScrollEnabled={true}
                >
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
                        listViewDisplayed='auto'  // Add this
                        enablePoweredByContainer={false}  // Optional: removes "Powered by Google"
                    />
                </View>

            <View style={{ zIndex: 1000, elevation: 1000, marginBottom: 12 }}>
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
                listViewDisplayed='auto'  // Add this
                enablePoweredByContainer={false}  // Optional: removes "Powered by Google"                
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
        </ScrollView>
        </View>
    </KeyboardAvoidingView>        
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 12,
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
        backgroundColor: 'white'
    },
};
export default DriveScheduleScreen;