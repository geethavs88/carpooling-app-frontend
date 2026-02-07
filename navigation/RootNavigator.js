import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

function RootNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // start as false
    const [username, setUsername] = useState(""); // optional, if you want to track username

    return (
        <NavigationContainer>
            {!isLoggedIn ? (
                // Show Login/Register stack first
                <AuthStack setIsLoggedIn={setIsLoggedIn} />
            ) : (
                // Once logged in, show main app
                <AppTabs />
            )}
        </NavigationContainer>
    );
}

export default RootNavigator;



// import React, { useState } from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import { View, Text, ActivityIndicator } from 'react-native';
// import AuthStack from './AuthStack';
// import AppTabs from './AppTabs';


// function RootNavigator() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <NavigationContainer>
//             {isLoggedIn ? (
//                 <AppTabs />
//             ) : (
//                 <AuthStack setIsLoggedIn={setIsLoggedIn} />
//             )}
//         </NavigationContainer>
//     );
// }

// export default RootNavigator;