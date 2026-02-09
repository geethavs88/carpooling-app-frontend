import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack />
      ) : (
        <AppTabs />
      )}
    </NavigationContainer>
  );
}

export default RootNavigator;