import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CurrentSeasonAnime from '@/modules/Home/CurrentSeasonAnime';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        <CurrentSeasonAnime />
      </ScrollView>
    </SafeAreaView>
  );
}
