import { StyleSheet, Text, View } from 'react-native';

export function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Onboarding Screen</Text>
    </View>
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
