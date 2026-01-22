import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen() {
    return (
        <View>
            <Text> My Profile </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    myCommutesContainer: {
        flex: 1,
        padding: 16
    }

});
export default ProfileScreen;