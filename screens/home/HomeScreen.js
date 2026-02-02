import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
function HomeScreen({ navigation }) {
   
    return (
    <View style={styles.homeInputContainer}>
        <Text> Home Screen </Text>
        <PrimaryButton onPress={() => navigation.navigate('RideSchedule')}>Schedule Ride</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('DriveSchedule')}>Schedule Drive</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('MyCommutes')}>My Commutes</PrimaryButton>
        <PrimaryButton onPress={() => navigation.navigate('MyProfile')}>My Profile</PrimaryButton>
    </View>
    );
    
}
const styles = StyleSheet.create({
    homeInputContainer: {

        marginTop:100,
        marginHorizontal: 16,
        padding: 16,
        borderColor: '#ccc',
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8

    }


});
export default HomeScreen;