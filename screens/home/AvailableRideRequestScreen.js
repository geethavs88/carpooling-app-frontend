import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import RequestRideCards from '../../components/RequestRideCards';
import { useState, useEffect, use } from 'react';
import { searchRides } from '../../api/rides.js';
import { postRide } from '../../api/rides';

const AvailableRideRequestScreen = ({ route }) => {
    const { search } = route.params;
    const {
    startLocation,
    destination,
    startDateTime,
    endDateTime,
    availableSeats
    } = search;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rideRequests, setRideRequests] = useState([]);
    const [remainingSeats, setRemainingSeats] = useState(search.availableSeats);
    
//     const MOCK_RIDE_REQUESTS = [
//     {
//     id: 1,
//     riderName: 'Alice',
//     pickupLocation: 'Downtown',
//     destination: 'Airport',
//     requestedStartTime: '2026-02-10T09:30:00.000Z',
//     requestedEndTime: '2026-02-10T10:30:00.000Z',
//     status: 'pending',
//     },
//     {
//     id: 2,
//     riderName: 'Bob',
//     pickupLocation: 'Downtown',
//     destination: 'Airport',
//     requestedStartTime: '2026-02-10T09:00:00.000Z',
//     requestedEndTime: '2026-02-10T11:00:00.000Z',
//     status: 'pending',
//     },
// ];


    useEffect(() => {
        searchRides({
            startLocation,
            endLocation: destination,
            earliestDateTimeISO: new Date(startDateTime).toISOString(),
            latestDateTimeISO: new Date(endDateTime).toISOString(),
            rideType: 'REQUEST',
        })
        .then(setRideRequests)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, []);
    
    const handleAccept = (request) => {
        setRemainingSeats((prev) => prev - 1);
        setRideRequests(prev => prev.map(
            req => req.id === request.id
                ? { ...req, status: 'accepted' }
                : req
        ));
    };
    const handleReject = (requestId) => {
        setRideRequests(prev =>
            prev.map(req =>
                req.id === requestId
                    ? { ...req, status: 'rejected' }
                    : req
            )
        );
    };
    const handlePostRideRequest = async () => {
        try {
            await postRide({
                startLocation,
                destination,
                startDateTimeISO: new Date(startDateTime).toISOString(),
                endDateTimeISO: new Date(endDateTime).toISOString(),
                availableSeats,
                rideType: 'OFFER',
            });

            alert('Ride offer posted successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    const renderItem = ({ item }) => (
        <RequestRideCards
            request={item}
            onAccept={() => handleAccept(item)}
            onReject={() => handleReject(item.id)}
        />
    );

    
    return (
        <View style={styles.container}>
            <FlatList
                data={rideRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                <Text style={styles.empty}>No matching ride requests found.</Text>
                }
        />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePostRideRequest} style={styles.button}>
                    <Text style={styles.buttonText}>Publish new ride offer</Text>
                </TouchableOpacity>
            </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
        buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 4,
        padding: 10,
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },

});

export default AvailableRideRequestScreen;





