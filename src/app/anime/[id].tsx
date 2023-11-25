import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useLocalSearchParams } from 'expo-router';

function AnimeDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{id}</Text>
    </View>
  );
}

export default AnimeDetail;
