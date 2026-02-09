import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProfileScreen() {
    const { user } = useContext(AuthContext);

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