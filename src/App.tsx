import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { RootStackNavigator } from './navigation/RootStackNavigator';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer>
          <KeyboardProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor="transparent"
              translucent
              animated
            />
            <RootStackNavigator />
          </KeyboardProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
