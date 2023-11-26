import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';
import QueryProvider from '@/components/utils/QueryProvider';
import ThemingProvider from '@/components/utils/ThemingProvider';

function RootLayout() {
  return (
    <QueryProvider>
      <ThemingProvider>
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
      </ThemingProvider>
    </QueryProvider>
  );
}

export default RootLayout;
