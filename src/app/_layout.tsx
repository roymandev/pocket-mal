import { useCallback, useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import {
  Rubik_400Regular,
  Rubik_500Medium,
  useFonts,
} from '@expo-google-fonts/rubik';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme: m3Theme } = useMaterial3Theme({
    // fallbackSourceColor: '#0891b2',
  });
  const [fontsLoaded, fontError] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const baseFont = {
    fontFamily: 'Rubik_400Regular',
  } as const;

  const baseVariants = configureFonts({
    config: baseFont,
  });

  const customVariants = {
    titleSmall: {
      ...baseVariants.titleSmall,
      fontFamily: 'Rubik_500Medium',
    },
    titleMedium: {
      ...baseVariants.titleMedium,
      fontFamily: 'Rubik_500Medium',
    },
    titleLarge: {
      ...baseVariants.titleLarge,
      fontFamily: 'Rubik_500Medium',
    },
    labelSmall: {
      ...baseVariants.labelSmall,
      fontFamily: 'Rubik_500Medium',
    },
    labelMedium: {
      ...baseVariants.labelMedium,
      fontFamily: 'Rubik_500Medium',
    },
    labelLarge: {
      ...baseVariants.labelLarge,
      fontFamily: 'Rubik_500Medium',
    },
  };

  const fonts = configureFonts({
    config: {
      ...baseFont,
      ...customVariants,
    },
  });

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...MD3DarkTheme,
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              ...m3Theme.dark,
            },
            fonts,
          }
        : {
            ...MD3LightTheme,
            ...LightTheme,
            colors: {
              ...LightTheme.colors,
              ...m3Theme.light,
            },
            fonts,
          },
    [DarkTheme, LightTheme, colorScheme, m3Theme.dark, m3Theme.light, fonts]
  );

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <View
          onLayout={onLayoutRootView}
          style={{ flex: 1, backgroundColor: paperTheme.colors.background }}
        >
          <Slot />
        </View>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default RootLayout;
