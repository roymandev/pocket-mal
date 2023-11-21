import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAnime } from '@/queries/animeQueries';

export default function App() {
  const { data, error, isLoading } = useAnime();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>{error?.message}</Text>
      <Text>{isLoading ? 'Loading...' : data?.data[0]?.node.title}</Text>
    </View>
  );
}
