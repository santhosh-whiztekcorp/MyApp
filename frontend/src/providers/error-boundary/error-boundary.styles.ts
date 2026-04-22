import { StyleSheet } from 'react-native';
import { colors, fontFamilies, fontSizes, spacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  text: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.userPrimaryBold,
    color: colors.destructive,
    textAlign: 'center',
  },
});
