// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// // function HomeScreen({ navigation }) {
// //     const { user } = useContext(AuthContext);
// //     return (
// //     <View style={styles.homeInputContainer}>
// //         <Text> Welcome, {user.username} </Text>
// //         <PrimaryButton onPress={() => navigation.navigate('RideSchedule')}>Schedule Ride</PrimaryButton>
// //         <PrimaryButton onPress={() => navigation.navigate('DriveSchedule')}>Schedule Drive</PrimaryButton>
// //         <PrimaryButton onPress={() => navigation.navigate('MyCommutes')}>My Commutes</PrimaryButton>
// //         <PrimaryButton onPress={() => navigation.navigate('MyProfile')}>My Profile</PrimaryButton>
// //         {/* <PrimaryButton onPress={() => navigation.navigate('Login')}>Login</PrimaryButton> */}
// //     </View>
// //     );
    
// // }
// function HomeScreen({ navigation }) {
//     const { user } = useContext(AuthContext);

//     const menuItems = [
//     { id: '1', label: 'Schedule Ride', route: 'RideSchedule' },
//     { id: '2', label: 'Schedule Drive', route: 'DriveSchedule' },
//     { id: '3', label: 'My Commutes', route: 'MyCommutes' },
//     { id: '4', label: 'My Profile', route: 'MyProfile' },
//     ];

//     return (
//         <View style={styles.homeInputContainer}>
//             <Text>Welcome, {user.username}</Text>

//                 <FlatList
//                     data={menuItems}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                     <PrimaryButton onPress={() => navigation.navigate(item.route)}>
//                         {item.label}
//                     </PrimaryButton>
//                     )}
//                 />
//         </View>
//     );
// }
// // const styles = StyleSheet.create({
// //     homeInputContainer: {

// //         marginTop:100,
// //         marginHorizontal: 16,
// //         padding: 16,
// //         borderColor: '#ccc',
// //         borderRadius: 8,
// //         elevation: 4,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 0, height: 2 },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 8

// //     }


// // });
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F8F9FB', // soft app background
//         paddingHorizontal: 20,
//         paddingTop: 60,
//     },

//     welcomeText: {
//         fontSize: 22,
//         fontWeight: '600',
//         marginBottom: 24,
//         color: '#1F2937', // dark gray
//     },

//     listContainer: {
//         paddingBottom: 20,
//     },

//     buttonSpacing: {
//         marginBottom: 14,
//     },
// });
// export default HomeScreen;


import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function HomeScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    const menuItems = [
        { 
            id: '1', 
            label: 'Schedule Ride', 
            route: 'RideSchedule', 
            icon: '🚗',
            color: '#4F46E5',
            lightColor: '#EEF2FF'
        },
        { 
            id: '2', 
            label: 'Schedule Drive', 
            route: 'DriveSchedule', 
            icon: '🚙',
            color: '#0891B2',
            lightColor: '#ECFEFF'
        },
        { 
            id: '3', 
            label: 'My Commutes', 
            route: 'MyCommutes', 
            icon: '📍',
            color: '#059669',
            lightColor: '#ECFDF5'
        },
        { 
            id: '4', 
            label: 'My Profile', 
            route: 'MyProfile', 
            icon: '👤',
            color: '#7C3AED',
            lightColor: '#F5F3FF'
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greeting}>{getGreeting()}</Text>
                <Text style={styles.username}>{user.username}</Text>
            </View>

            {/* 2x2 Grid */}
            <View style={styles.gridContainer}>
                <View style={styles.row}>
                    {menuItems.slice(0, 2).map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.tile, { backgroundColor: item.lightColor }]}
                            onPress={() => navigation.navigate(item.route)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                                <Text style={styles.icon}>{item.icon}</Text>
                            </View>
                            <Text style={styles.labelText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.row}>
                    {menuItems.slice(2, 4).map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.tile, { backgroundColor: item.lightColor }]}
                            onPress={() => navigation.navigate(item.route)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                                <Text style={styles.icon}>{item.icon}</Text>
                            </View>
                            <Text style={styles.labelText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    greeting: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '400',
        marginBottom: 4,
    },

    username: {
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
    },

    gridContainer: {
        flex: 1,
        padding: 16,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },

    tile: {
        flex: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },

    icon: {
        fontSize: 32,
    },

    labelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
    },
});

export default HomeScreen;