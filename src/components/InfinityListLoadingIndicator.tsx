import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type Props = {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

function InfinityListLoadingIndicator({
  isLoading,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  return (
    (isLoading || hasNextPage) && (
      <View
        style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}
      >
        {(isLoading || isFetchingNextPage) && (
          <ActivityIndicator animating size="large" />
        )}
      </View>
    )
  );
}

export default InfinityListLoadingIndicator;
