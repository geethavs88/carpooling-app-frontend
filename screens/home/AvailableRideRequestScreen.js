import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import RequestRideCards from '../../components/RequestRideCards';
import { useState, useEffect, useContext } from 'react';
import { searchRides } from '../../api/rides.js';
import { postRide } from '../../api/rides';
import { AuthContext } from '../../context/AuthContext';
import { acceptRideRequest } from '../../api/rides.js';
import { rejectRideRequest } from '../../api/rides.js';

const AvailableRideRequestScreen = ({ route }) => {
    const { user } = useContext(AuthContext);
    const { search } = route.params;
    const {
    startLocation,
    destination,
    startCoords,
    destinationCoords,
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
            startCoords: search.startCoords,
            destinationCoords: search.destinationCoords,
            earliestDateTimeISO: new Date(startDateTime).toISOString(),
            latestDateTimeISO: new Date(endDateTime).toISOString(),
            rideType: 'REQUEST',
            driverId: user.id, //new
        })
        .then(setRideRequests)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [startLocation, destination, startDateTime, endDateTime, search.startCoords, search.destinationCoords]);
    
    const handleAccept = async (requestId) => {
        try {
            const updated = await acceptRideRequest(requestId, user.id);

            // remove from AvailableRideRequestScreen
            setRideRequests(prev =>
                prev.map(req =>
                req.id === requestId
                ? { ...req, status: updated.status.toUpperCase() }
                : req
            )

        );
        setRemainingSeats(updated.available_seats);
        } catch (e) {
            alert(e.message);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await rejectRideRequest(requestId, user.id);
            setRideRequests(prev =>
                prev.map(req =>
                    req.id === requestId
                        ? { ...req, status: 'REJECTED' }
                        : req
                )
            );
        } catch (e) {
            alert(e.message);
        }
    };
    const handlePostRideRequest = async () => {
        try {
            await postRide({
                startLocation,
                destination,
                startCoords: search.startCoords,
                destinationCoords: search.destinationCoords,
                startDateTimeISO: new Date(startDateTime).toISOString(),
                endDateTimeISO: new Date(endDateTime).toISOString(),
                availableSeats,
                rideType: 'OFFER',
                userId: user.id,
            });

            alert('Ride offer posted successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    const renderItem = ({ item }) => (
        <RequestRideCards
            request={item}
            onAccept={() => handleAccept(item.id)}
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
        backgroundColor: '#AD40AF',
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





