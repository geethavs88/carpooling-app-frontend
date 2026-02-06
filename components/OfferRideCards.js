import { View, Text, Button, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';

const OfferRideCards = ({ ride, requestedRideIds, onRequestRide }) =>{
    const isRequested = requestedRideIds.includes(ride.id);
    return (
        <View style={styles.cardStyle}>
            <Text style={styles.driverFont}>Driver : {ride.carpooler}</Text>
            <Text>From: {ride.start_location}</Text>
            <Text>To: {ride.end_location}</Text>
            <Text>Start: {new Date(ride.earliest_time).toLocaleString()}</Text>
            <Text>End: {new Date(ride.latest_time).toLocaleString()}</Text>
            <Text>Seats: {ride.available_seats}</Text>
            <TouchableOpacity
                style={[styles.requestButton, isRequested && styles.disabledButton]}
                disabled={isRequested}  
                onPress={() => onRequestRide(ride.id)}>
                <Text style={styles.buttonText}>
                    {isRequested ? 'Requested' : 'Request Ride'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    cardStyle: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
    },
    driverFont: {
        fontWeight: 'bold',
    },
    requestButton: {
        marginTop: 8,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 6,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
export default OfferRideCards;
