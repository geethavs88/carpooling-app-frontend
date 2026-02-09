import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import OfferRideCards from '../../components/OfferRideCards';
import { useState, useEffect, useContext } from 'react';
import { searchRides } from '../../api/rides';
import { postRide } from '../../api/rides';
import { AuthContext } from '../../context/AuthContext';
import { bookRide } from '../../api/rides';

function AvailableRidesScreen({ route }){
    const { user } = useContext(AuthContext);
    const { search } = route.params;
    const { startLocation, destination, startDateTime, endDateTime } = search;
    const [rideRequests, setRideRequests] = useState([]);
    const [requestedRideIds, setRequestedRideIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const MOCK_DRIVER_RIDES = [
    // {
    //     id: 1,
    //     driver: 'Alice',
    //     start: 'Downtown',
    //     end: 'Airport',
    //     startDateTime: '2026-02-10T17:00:00.000Z',
    //     endDateTime: '2026-02-10T19:00:00.000Z',
    //     seats: 2,
    // },
    // {
    //     id: 2,
    //     driver: 'Bob',
    //     start: 'Downtown',
    //     end: 'Airport',
    //     startDateTime: '2026-02-10T11:00:00.000Z',
    //     endDateTime: '2026-02-10T13:00:00.000Z',
    //     seats: 1,
    // },
    // {
    //     id: 3,
    //     driver: 'Charlie',
    //     start: 'Downtown',
    //     end: 'Airport',
    //     startDateTime: '2026-02-10T08:30:00.000Z',
    //     endDateTime: '2026-02-10T09:30:00.000Z',
    //     seats: 3,
    // },
    // ];


 // Implement search functionality here
    // const filterRides= MOCK_DRIVER_RIDES.filter((ride) =>{


    //     const rideStart = ride.startDateTime;
    //     const rideEnd = ride.endDateTime;
    //     const searchStart = startDateTime;
    //     const searchEnd = endDateTime;
    //     return (
    //         ride.start.toLowerCase() === startLocation.toLowerCase() &&
    //         ride.end.toLowerCase() === destination.toLowerCase() &&
    //         // rideStart >= searchStart &&
    //         // rideEnd <= searchEnd &&
    //         ride.seats > 0
    //     );
    // });
        useEffect(() => {
        searchRides({
            startLocation,
            endLocation: destination,
            earliestDateTimeISO: new Date(startDateTime).toISOString(),
            latestDateTimeISO: new Date(endDateTime).toISOString(),
            rideType: 'OFFER',
        })
            .then(setRideRequests)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        }, [startLocation, destination, startDateTime, endDateTime]);

    const handleRequestRide = async (rideId) => {
        setRequestedRideIds((prev) => [...prev, rideId]);
        try {
            await bookRide(rideId, user.id);
            setRequestedRideIds((prev) => [...prev, rideId]);
            alert('Ride booked successfully!');
        } catch (err) {
            alert(err.message);
        }
    };
    if (loading) {
        return (
            <View style={styles.availableRidesContainer}>
                <Text>Loading rides...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.availableRidesContainer}>
                {console.log(error)}
                <Text>Error: {error}</Text>
            </View>
        );
    }
    const handlePostRideRequest = async () => {
        try {
            await postRide({
                startLocation,
                destination,
                startDateTimeISO: new Date(startDateTime).toISOString(),
                endDateTimeISO: new Date(endDateTime).toISOString(),
                rideType: 'REQUEST',
                userId: user.id,
            });

            alert('Ride request posted successfully!');
        } catch (err) {
            alert(err.message);
        }
    };

    return(
        <View style={styles.availableRidesContainer}>
            <Text>Available Rides</Text>
            {rideRequests.length === 0 ? <Text>No rides available</Text> : (
                <FlatList
                    data={rideRequests}
                    renderItem={({ item }) => <OfferRideCards ride={item} requestedRideIds={requestedRideIds} onRequestRide={handleRequestRide} />}
                    keyExtractor={(item) => String(item.id)}
                />
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePostRideRequest} style={styles.button}>
                    <Text style={styles.buttonText}>Publish new ride request</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    availableRidesContainer: {
        flex: 1,
        padding: 16
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
export default AvailableRidesScreen;