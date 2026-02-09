import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import LocationSearch from '../../components/LocationSearch';
import CustomMapView from '../../components/MapView';
import { BASE_URL } from '../../config';
import { useAuth } from '../../navigation/AuthContext';

const RideScheduleScreen = ({ navigation }) => {
  const { userId } = useAuth();
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleScheduleRide = async () => {
    if (!pickupLocation || !dropoffLocation || !date || !time) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    const payload = {
      pickup_location: pickupLocation.address,
      pickup_lat: pickupLocation.latitude,
      pickup_lng: pickupLocation.longitude,
      dropoff_location: dropoffLocation.address,
      dropoff_lat: dropoffLocation.latitude,
      dropoff_lng: dropoffLocation.longitude,
      date,
      time,
      seats_needed: parseInt(seats),
      user_id: userId,
    };

    try {
      const response = await fetch(`${BASE_URL}/rides/schedule/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Ride scheduled successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', data.detail || 'Failed to schedule ride');
      }
    } catch (error) {
      console.error('Schedule ride error:', error);
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Schedule a Ride</Text>

      <LocationSearch
        placeholder="Pickup Location *"
        onLocationSelect={setPickupLocation}
      />

      <LocationSearch
        placeholder="Drop-off Location *"
        onLocationSelect={setDropoffLocation}
      />

      {pickupLocation && dropoffLocation && (
        <View style={styles.mapContainer}>
          <CustomMapView
            origin={pickupLocation}
            destination={dropoffLocation}
            showDirections={true}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD) *"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM) *"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Seats *"
        value={seats}
        onChangeText={setSeats}
        keyboardType="number-pad"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleScheduleRide}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Scheduling...' : 'Schedule Ride'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mapContainer: {
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#AD40AF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideScheduleScreen;



// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { useState } from 'react';
// import InputField from '../../components/InputField';
// import PrimaryButton from '../../components/PrimaryButton';

// function RideScheduleScreen({ navigation }) {
//     const MOCK_DRIVER_RIDES = [
//   {
//     id: 1,
//     driver: 'Alice',
//     start: 'Downtown',
//     end: 'Airport',
//     date: '2026-02-10',
//     timeSlot: '9-11 AM',
//     seats: 2,
//   },
//   {
//     id: 2,
//     driver: 'Bob',
//     start: 'Downtown',
//     end: 'Airport',
//     date: '2026-02-10',
//     timeSlot: '11-1 PM',
//     seats: 1,
//   },
// ];
//     const [startLocation, setStartLocation] = useState('');
//     const [destination, setDestination] = useState('');
//     const [date, setDate] = useState('');
//     const [timeSlot, setTimeSlot] = useState('');
//     const handleSearch = () => {
//         if (!startLocation || !destination || !date || !timeSlot) {
//             // Show an error message or handle the case where fields are empty
//             alert('Please fill in all fields before searching for rides.');
//             return;
//         }
//         // Implement search functionality here
//         const results= MOCK_DRIVER_RIDES.filter((ride) =>
//                 ride.start.toLowerCase() === startLocation.toLowerCase() &&
//                 ride.end.toLowerCase() === destination.toLowerCase() &&
//                 ride.date === date &&
//                 ride.timeSlot === timeSlot
//             )   
//         navigation.navigate('AvailableRides', {
//             search: {
//                 startLocation,
//                 destination,
//                 date,
//                 timeSlot
//             },
//             rides: results
//         });
//     };

//     return (
//         <View style={styles.rideScheduleInputContainer}>
//             <Text>Ride Schedule</Text>
//             <InputField
//                 placeholder="Start Location"
//                 value={startLocation}
//                 onChangeText={setStartLocation}
//             />
//             <InputField
//                 placeholder="Destination"
//                 value={destination}
//                 onChangeText={setDestination}
//             />
//             <InputField
//                 placeholder="Date"
//                 value={date}
//                 onChangeText={setDate}
//             />
//             <InputField
//                 placeholder="Time"
//                 value={timeSlot}
//                 onChangeText={setTimeSlot}
//             />
//             <PrimaryButton onPress={handleSearch}>Find Available Rides </PrimaryButton>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     rideScheduleInputContainer: {
//         flex:1,
//         padding:8


//     }
// }
// );
// export default RideScheduleScreen;
