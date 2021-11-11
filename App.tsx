import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WebEngine from './components/WebEngine';
import ArticleScreen from './screens/ArticleScreen';
import HomeScreen from './screens/HomeScreen';
import { RootStackParamList } from './shared-types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <WebEngine>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" options={{ title: 'Blog' }} component={HomeScreen} />
            <Stack.Screen name="Article" options={{ headerShown: true }} component={ArticleScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </WebEngine>
  );
}
