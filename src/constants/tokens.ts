export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
} as const;

export const fontFamilies = {
  // User Role
  userPrimary: 'Bevellier-Medium',
  userPrimarySemiBold: 'Bevellier-Semibold',
  userPrimaryBold: 'Bevellier-Bold',

  userSecondary: 'Fredoka-Regular',
  userSecondaryMedium: 'Fredoka-Medium',
  userSecondarySemiBold: 'Fredoka-SemiBold',

  userTertiary: 'Nunito-ExtraBold',

  // Admin Role
  adminPrimary: 'PlusJakartaSans-Regular',
  adminPrimaryMedium: 'PlusJakartaSans-Medium',
  adminPrimarySemiBold: 'PlusJakartaSans-SemiBold',
  adminPrimaryBold: 'PlusJakartaSans-Bold',
} as const;

export const colors = {
  background: '#F2F2F7',
  foreground: '#1C1C1E',

  card: '#FFFFFF',
  cardForeground: '#1C1C1E',

  popover: '#FFFFFF',
  popoverForeground: '#1C1C1E',

  primary: '#007AFF',
  primaryForeground: '#FFFFFF',

  secondary: '#EBEAFB',
  secondaryForeground: '#5856D6',

  muted: '#D1D1D6',
  mutedForeground: '#8E8E93',

  accent: '#E5F1FF',
  accentForeground: '#0056B3',

  destructive: '#FF3B30',
  destructiveForeground: '#FFFFFF',

  border: '#C6C6C8',
  input: '#C6C6C8',
  ring: '#007AFF',

  success: '#34C759',
  successForeground: '#FFFFFF',
  warning: '#FF9500',
  warningForeground: '#FFFFFF',

  transparent: 'transparent',
} as const;

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
} as const;

export const radii = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

export const zIndices = {
  hide: -1,
  base: 0,
  dock: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

export const opacity = {
  none: 0,
  low: 0.3,
  medium: 0.5,
  high: 0.8,
  full: 1,
} as const;

export const tokens = {
  fontSizes,
  fontFamilies,
  colors,
  spacing,
  radii,
  shadows,
  zIndices,
  opacity,
} as const;
