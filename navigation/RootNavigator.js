import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';


function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <AppTabs />
            ) : (
                <AuthStack setIsLoggedIn={setIsLoggedIn} />
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
    