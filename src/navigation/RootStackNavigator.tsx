import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '@/screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

export function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
