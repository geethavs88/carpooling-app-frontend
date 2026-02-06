import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';


function RootNavigator() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const handleLogin = () => {
        // Implement your actual login logic here
        setUserLoggedIn(true);
    };

    const handleLogout = () => {
        setUserLoggedIn(false);
    };

    if (isLoading) {
        return (
            <NavigationContainer>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            {userLoggedIn ? (
                // Renders only AppTabs if userLoggedIn is true
                <AppTabs handleLogout={handleLogout} /> 
            ) : (
                // Renders only AuthStack if userLoggedIn is false
                <AuthStack handleLogin={handleLogin} />
            )}
        </NavigationContainer>
    );
}

export default RootNavigator;










// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from '../screens/auth/LoginScreen';
// import AppTabs from './AppTabs';
// import AuthStack from './AuthStack';

// const Stack = createNativeStackNavigator();
// function RootNavigator() {

//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>

//                 <Stack.Screen name="AuthStack" component={AuthStack} />
//                 <Stack.Screen name="AppTabs" component={AppTabs} />

//                     {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default RootNavigator;
    