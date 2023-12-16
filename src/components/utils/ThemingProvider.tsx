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

import * as SplashScreen from 'expo-splash-screen';

import {
  Rubik_400Regular,
  Rubik_500Medium,
  useFonts,
} from '@expo-google-fonts/rubik';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

SplashScreen.preventAutoHideAsync();

type Props = {
  children: JSX.Element;
};

function ThemingProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  const { theme: m3Theme } = useMaterial3Theme({
    fallbackSourceColor: '#D81159',
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

  const customVariants = useMemo(
    () =>
      Object.keys(baseVariants).reduce((acc, key) => {
        const variant = baseVariants[key as keyof typeof baseVariants];
        const fontFamily =
          variant.fontWeight === '500' ? 'Rubik_500Medium' : 'Rubik_400Regular';

        return {
          ...acc,
          [key]: {
            ...variant,
            fontFamily,
          },
        };
      }, {}),
    [baseVariants]
  );

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
          {children}
        </View>
      </ThemeProvider>
    </PaperProvider>
  );
}

export default ThemingProvider;
