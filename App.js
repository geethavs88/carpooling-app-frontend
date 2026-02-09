// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import RootNavigator from './navigation/RootNavigator';

// export default function App() {
//   return (

//     <RootNavigator />
//   );
// }

// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

// });

import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './navigation/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}