import React from 'react';
import { StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from './src/screens/PostScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import Toast from 'react-native-toast-message';
import FavoritePost from './src/screens/FavoritePostScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Categories"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Categories"
            component={CategoryScreen}
            options={{}}
          />
          <Stack.Screen name="Posts" component={PostScreen} />
          <Stack.Screen name="Favorite" component={FavoritePost} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;

