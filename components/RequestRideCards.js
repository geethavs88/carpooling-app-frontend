import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RequestRideCards = ({ request, onAccept, onReject }) => {
    const status = (request.status ?? 'PENDING').toUpperCase(); // default PENDING
    const isAcceptDisabled = status !== 'PENDING';
    const isRejectDisabled = status !== 'PENDING';

    const getCardStyle = (status) => {
        if (status === 'CONFIRMED') return styles.acceptedCard;
        if (status === 'REJECTED') return styles.rejectedCard;
        return styles.card;
    };

    return (
        <View style={getCardStyle(status)}>
            <Text style={styles.title}>Ride ID: {request.id}</Text>
            <Text>From: {request.start_location}</Text>
            <Text>To: {request.end_location}</Text>
            <Text>Earliest: {new Date(request.earliest_time).toLocaleString()}</Text>
            <Text>Latest: {new Date(request.latest_time).toLocaleString()}</Text>
            <Text>Status: {status}</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={onAccept}
                    style={[styles.button, isAcceptDisabled && styles.disabledButton]}
                    disabled={isAcceptDisabled}
                >
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onReject}
                    style={[styles.button, isRejectDisabled && styles.disabledButton]}
                    disabled={isRejectDisabled}
                >
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
    acceptedCard: {
        backgroundColor: '#E6F9F0',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    rejectedCard: {
        backgroundColor: '#FDECEC',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
});

export default RequestRideCards;

