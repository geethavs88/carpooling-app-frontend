import { View, Text, StyleSheet } from 'react-native';

function MyCommutesScreen() {
    return (
        <View>
            <Text> My Commutes </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    myCommutesContainer: {
        flex: 1,
        padding: 16
    }

});
export default MyCommutesScreen;