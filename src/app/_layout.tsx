import { Stack } from 'expo-router';

import QueryProvider from '@/components/utils/QueryProvider';
import ThemingProvider from '@/components/utils/ThemingProvider';

function RootLayout() {
  return (
    <QueryProvider>
      <ThemingProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemingProvider>
    </QueryProvider>
  );
}

export default RootLayout;
