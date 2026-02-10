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
    const { startLocation, destination, startCoords, destinationCoords, startDateTime, endDateTime } = search;
    const [rideRequests, setRideRequests] = useState([]);
    const [requestedRideIds, setRequestedRideIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




        useEffect(() => {
        searchRides({
            startLocation,
            endLocation: destination,
            startCoords: search.startCoords,          // added
            destinationCoords: search.destinationCoords, // added
            earliestDateTimeISO: new Date(startDateTime).toISOString(),
            latestDateTimeISO: new Date(endDateTime).toISOString(),
            rideType: 'OFFER',
        })
            .then(setRideRequests)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
        }, [startLocation, destination, startDateTime, endDateTime, search.startCoords, search.destinationCoords]);

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
                startCoords: search.startCoords,          // pass coordinates
                destinationCoords: search.destinationCoords,
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