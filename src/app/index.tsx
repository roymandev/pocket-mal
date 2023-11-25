import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CurrentSeasonAnime from '@/components/Home/CurrentSeasonAnime';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <CurrentSeasonAnime />
      </ScrollView>
    </SafeAreaView>
  );
}
