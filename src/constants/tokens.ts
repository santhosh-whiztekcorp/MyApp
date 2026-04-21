export const fontSizes = {
  '2xs': 10,
  xs: 12,

  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
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
  background: '#ffffff',
  foreground: '#0a0a0a',

  card: '#ffffff',
  cardForeground: '#0a0a0a',

  popover: '#ffffff',
  popoverForeground: '#0a0a0a',

  primary: '#171717',
  primaryForeground: '#fafafa',

  secondary: '#f5f5f5',
  secondaryForeground: '#171717',

  muted: '#f5f5f5',
  mutedForeground: '#737373',

  accent: '#f5f5f5',
  accentForeground: '#171717',

  destructive: '#ef4444',
  destructiveForeground: '#fafafa',

  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#171717',

  success: '#22c55e',
  successForeground: '#052e16',

  warning: '#f59e0b',
  warningForeground: '#422006',

  transparent: 'transparent',
} as const;

export const spacing = {
  none: 0,
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
} as const;

export const radii = {
  none: 0,
  '2xs': 1,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  '4xl': 32,
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
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 16,
  },
} as const;

export const zIndices = {
  0: 0,
  5: 5,
  10: 10,
  15: 15,
  20: 20,
  25: 25,
  30: 30,
  35: 35,
  40: 40,
  45: 45,
  50: 50,
  55: 55,
  60: 60,
  65: 65,
  70: 70,
  75: 75,
  80: 80,
  85: 85,
  90: 90,
  95: 95,
  100: 100,
} as const;

export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
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
