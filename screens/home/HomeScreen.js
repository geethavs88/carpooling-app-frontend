import { View, Text, StyleSheet, FlatList } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// function HomeScreen({ navigation }) {
//     const { user } = useContext(AuthContext);
//     return (
//     <View style={styles.homeInputContainer}>
//         <Text> Welcome, {user.username} </Text>
//         <PrimaryButton onPress={() => navigation.navigate('RideSchedule')}>Schedule Ride</PrimaryButton>
//         <PrimaryButton onPress={() => navigation.navigate('DriveSchedule')}>Schedule Drive</PrimaryButton>
//         <PrimaryButton onPress={() => navigation.navigate('MyCommutes')}>My Commutes</PrimaryButton>
//         <PrimaryButton onPress={() => navigation.navigate('MyProfile')}>My Profile</PrimaryButton>
//         {/* <PrimaryButton onPress={() => navigation.navigate('Login')}>Login</PrimaryButton> */}
//     </View>
//     );
    
// }
function HomeScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    const menuItems = [
    { id: '1', label: 'Schedule Ride', route: 'RideSchedule' },
    { id: '2', label: 'Schedule Drive', route: 'DriveSchedule' },
    { id: '3', label: 'My Commutes', route: 'MyCommutes' },
    { id: '4', label: 'My Profile', route: 'MyProfile' },
    ];

    return (
        <View style={styles.homeInputContainer}>
            <Text>Welcome, {user.username}</Text>

                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <PrimaryButton onPress={() => navigation.navigate(item.route)}>
                        {item.label}
                    </PrimaryButton>
                    )}
                />
        </View>
    );
}
// const styles = StyleSheet.create({
//     homeInputContainer: {

//         marginTop:100,
//         marginHorizontal: 16,
//         padding: 16,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 8

//     }


// });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB', // soft app background
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    welcomeText: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 24,
        color: '#1F2937', // dark gray
    },

    listContainer: {
        paddingBottom: 20,
    },

    buttonSpacing: {
        marginBottom: 14,
    },
});
export default HomeScreen;