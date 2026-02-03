import { View, Text, Button, StyleSheet} from 'react-native';

const OfferRideCards = ({ ride }) =>{
    return (
        <View style={styles.cardStyle}>
            <Text style={styles.driverFont}>Driver : {ride.driver}</Text>
            <Text>From: {ride.start}</Text>
            <Text>To: {ride.end}</Text>
            <Text>Start: {ride.startDateTime}</Text>
            <Text>End: {ride.endDateTime}</Text>
            <Text>Seats: {ride.seats}</Text>

            <Button title="Offer Ride"  />
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
    }
});
export default OfferRideCards;
