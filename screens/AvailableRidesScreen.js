import { View, Text, StyleSheet } from 'react-native';
function AvailableRidesScreen(){
    return(
        <View>
            <Text>Available Rides</Text>
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