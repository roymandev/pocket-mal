import { PaperTab } from '@/components/utils/PaperTab';
import QueryProvider from '@/components/utils/QueryProvider';
import ThemingProvider from '@/components/utils/ThemingProvider';

function RootLayout() {
  return (
    <QueryProvider>
      <ThemingProvider>
        <PaperTab>
          <PaperTab.Screen
            name="index"
            options={{ title: 'Home', tabBarIcon: 'home' }}
          />
          <PaperTab.Screen
            name="search"
            options={{ title: 'Search', tabBarIcon: 'magnify' }}
          />
        </PaperTab>
      </ThemingProvider>
    </QueryProvider>
  );
}

export default RootLayout;
