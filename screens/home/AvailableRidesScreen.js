import { View, Text, StyleSheet, FlatList } from 'react-native';
function AvailableRidesScreen({ route }){
    const { search } = route.params;
    const { startLocation, destination, startDateTime, endDateTime } = search;

    const MOCK_DRIVER_RIDES = [
    {
        id: 1,
        driver: 'Alice',
        start: 'Downtown',
        end: 'Airport',
        startDateTime: '2026-02-10T09:00:00.000Z',
        endDateTime: '2026-02-10T11:00:00.000Z',
        seats: 2,
    },
    {
        id: 2,
        driver: 'Bob',
        start: 'Downtown',
        end: 'Airport',
        startDateTime: '2026-02-10T11:00:00.000Z',
        endDateTime: '2026-02-10T13:00:00.000Z',
        seats: 1,
    },
    {
        id: 3,
        driver: 'Charlie',
        start: 'Downtown',
        end: 'Airport',
        startDateTime: '2026-02-10T08:30:00.000Z',
        endDateTime: '2026-02-10T09:30:00.000Z',
        seats: 3,
    },
    ];
 // Implement search functionality here
    const filterRides= MOCK_DRIVER_RIDES.filter((ride) =>{

    
        const rideStart = new Date(ride.startDateTime);
        const rideEnd = new Date(ride.endDateTime);
        const searchStart = new Date(startDateTime);
        const searchEnd = new Date(endDateTime);
        return (
            ride.start.toLowerCase() === startLocation.toLowerCase() &&
            ride.end.toLowerCase() === destination.toLowerCase() &&
            rideStart >= searchStart &&
            rideEnd <= searchEnd &&
            ride.seats > 0
        );
    });
    return(
        <View>
            <Text>Available Rides</Text>
            {filterRides.length === 0 ? <Text>No rides available</Text> : (
                <FlatList
                    data={filterRides}
                    renderItem={({ item }) => <OfferRideCards ride={item} />}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    availableRidesContainer: {
        flex: 1,
        padding: 16
    }

});
export default AvailableRidesScreen;