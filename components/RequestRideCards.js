import { View, Text, Button, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native';
// import PrimaryButton from './PrimaryButton  ';

const RequestRideCards = ({ request, onAccept, onReject }) => {
    const status = (request.status || 'PENDING').toUpperCase();
    const isDisabled = status !== 'PENDING' || request.available_seats <= 0;
    const getCardStyle = (status) => {
        const s = (status || 'PENDING').toUpperCase();
        if (s === 'CONFIRMED') return styles.acceptedCard;
        if (s === 'REJECTED') return styles.rejectedCard;
        return styles.card;
    };
    return (
        <View style={[styles.card, getCardStyle(request.status)]}>
            <Text style={styles.title}>{request.rideId}</Text>
            <Text>From: {request.start_location}</Text>
            <Text>To: {request.end_location}</Text>
            <Text>Earliest: {new Date(request.earliest_time).toLocaleString()}</Text>
            <Text>Latest: {new Date(request.latest_time).toLocaleString()}</Text>
            <Text>Status: {request.status}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={onAccept} 
                style={[styles.button, isDisabled && styles.disabledButton]} 
                disabled={isDisabled}
                >
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={onReject} 
                style={[styles.button, isDisabled && styles.disabledButton]} 
                disabled={isDisabled}
                >
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
    acceptedCard: {
        backgroundColor: '#E6F9F0',
    },
    rejectedCard: {
        backgroundColor: '#FDECEC',
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
},
});

export default RequestRideCards;

