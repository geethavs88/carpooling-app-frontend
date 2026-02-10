// import { View, Text, StyleSheet } from 'react-native';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// function ProfileScreen() {
//     const { user } = useContext(AuthContext);

//     return (
//         <View>
//             <Text> My Profile </Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     myCommutesContainer: {
//         flex: 1,
//         padding: 16
//     }

// });
// export default ProfileScreen;




import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { user, setUser } = useContext(AuthContext);

    const logout = () => {
        setUser(null);
    };

    const handleLogout = () => {
        Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
            { text: 'Cancel', style: 'cancel' },
            { 
            text: 'Logout', 
            style: 'destructive',
            onPress: logout
            }
        ]
        );
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
                {user ? user.username[0].toUpperCase() : 'U'}
            </Text>
            </View>
                <Text style={styles.username}>{user ? user.username : 'User'}</Text>
                <Text style={styles.userId}>ID: {user ? user.id : '-'}</Text>
        </View>

        <View style={styles.section}>
            <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Help & Support</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
        >
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#f8f8f8',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#AD40AF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userId: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        margin: 20,
        marginTop: 'auto',
        backgroundColor: '#ff3b30',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    });
export default ProfileScreen;