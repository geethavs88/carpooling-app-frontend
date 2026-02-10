import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '../../context/AuthContext';
import { useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../../config'; // Make sure to export this from your config.js

const GOOGLE_API_KEY = GOOGLE_MAPS_API_KEY;

function RideScheduleScreen({ navigation }) {
    const { user } = useContext(AuthContext);


    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [activePicker, setActivePicker] = useState(null); 

    const route = useRoute();
    const [startCoords, setStartCoords] = useState(null); // { latitude, longitude }
    const [destinationCoords, setDestinationCoords] = useState(null);

    // const [routeDistance, setRouteDistance] = useState(null);
    // const [routeDuration, setRouteDuration] = useState(null);

    
    // useEffect(() => {
    //     if (route.params) {
    //         const { type, name, latitude, longitude } = route.params;

    //         if (type === 'start') {
    //             setStartLocation(name);
    //             setStartCoords({ latitude, longitude });
    //         } else if (type === 'destination') {
    //             setDestination(name);
    //             setDestinationCoords({ latitude, longitude });
    //         }
    //     }
    // }, [route.params]);


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
                startCoords,
                destinationCoords,                
                startDateTime,
                endDateTime,

            }
        });
    };
//     const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 12,
//     },
//     dateTimePicker: {
//         width: '100%',
//         padding: 12,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 4,
//         marginBottom: 12,
//     },
//     });
//     const autoCompleteStyles = {
//         container: { flex: 0 },
//         textInput: {
//             borderWidth: 1,
//             borderColor: '#ccc',
//             borderRadius: 4,
//             padding: 12,
//             fontSize: 16,
//         },
//         listView: { 
//             position: 'absolute',
//             top: 50,
//             zIndex: 2000, 
//             elevation: 2000,
//             backgroundColor: 'white'
//         },
// };

    return (
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
        </ScrollView>
        </View>
    </KeyboardAvoidingView>
);

    // const styles = StyleSheet.create({
    // container: {
    //     flexGrow: 1,
    //     padding: 12,
    // },
    // dateTimePicker: {
    //     width: '100%',
    //     padding: 12,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 4,
    //     marginBottom: 12,
    // },
    // });
    // const autoCompleteStyles = {
    // container: { flex: 0 },
    // textInput: {
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 4,
    //     padding: 12,
    //     fontSize: 16,
    // },
    // listView: { zIndex: 2000, elevation: 2000 },
    // };

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

export default RideScheduleScreen;