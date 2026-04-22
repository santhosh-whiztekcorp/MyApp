import { StyleSheet, Text, View } from 'react-native';
import { ErrorBoundary } from '@/providers/error-boundary';

export function OnboardingScreen() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Text style={styles.text}>Onboarding Screen</Text>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    experimental_backgroundImage: 'linear-gradient(to bottom, #BAE7FF, #EEF5FE)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});
