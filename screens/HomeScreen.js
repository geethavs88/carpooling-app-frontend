import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
function HomeScreen() {
    return (
    <View>
        <Text> Home Screen</Text>
        <View>
            <PrimaryButton>Schedule Ride</PrimaryButton>
            <PrimaryButton>Schedule Drive</PrimaryButton>
            <PrimaryButton>My Commutes</PrimaryButton>
            <PrimaryButton>My Profile</PrimaryButton>
        </View>

    </View>);
    
}
export default HomeScreen;