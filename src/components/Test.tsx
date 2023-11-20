import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import axios from 'axios';

import { onlineManager, useQuery } from '@tanstack/react-query';

function Test() {
  // https://www.boredapi.com/api/activity
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: () => axios.get('https://www.boredapi.com/api/activity'),
  });

  return (
    <View style={{ gap: 16 }}>
      <Text>{JSON.stringify(query.data?.data)}</Text>
      <Text>{onlineManager.isOnline() ? 'Online' : 'Offline'}</Text>
      <Button onPress={() => {}} mode="contained">
        Button Test
      </Button>
    </View>
  );
}

export default Test;
