import { GestureHandlerRootView } from 'react-native-gesture-handler';

import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import QueryProvider from '@/components/utils/QueryProvider';
import ThemingProvider from '@/components/utils/ThemingProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryProvider>
        <ThemingProvider>
          <BottomSheetModalProvider>
            <PaperStack
              screenOptions={{
                headerShown: false,
                header: PaperStackHeader,
                transitionSpec: {
                  open: {
                    animation: 'timing',
                    config: { duration: 100, delay: 0 },
                  },
                  close: {
                    animation: 'timing',
                    config: { duration: 100, delay: 0 },
                  },
                },
              }}
            />
          </BottomSheetModalProvider>
        </ThemingProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
