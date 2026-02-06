import { View, Text, Button, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';
// import PrimaryButton from './PrimaryButton  ';

const RequestRideCards = ({ request, onAccept, onReject }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{request.rideId}</Text>
            <Text>From: {request.start_location}</Text>
            <Text>To: {request.end_location}</Text>
            <Text>Earliest: {new Date(request.earliest_time).toLocaleString()}</Text>
            <Text>Latest: {new Date(request.latest_time).toLocaleString()}</Text>
            <Text>Status: {request.status}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onAccept} style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onReject} style={styles.button}>
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
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

export default RequestRideCards;

