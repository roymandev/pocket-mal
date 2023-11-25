import { PaperTab } from '@/components/utils/PaperTab';

function RootLayout() {
  return (
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
  );
}

export default RootLayout;
