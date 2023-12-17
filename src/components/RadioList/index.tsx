import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Searchbar, Text } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import { useDebouncedValue } from '@mantine/hooks';
import { FlashList } from '@shopify/flash-list';

import RadioListItem from './RadioListItem';
import { RadioItem } from './type';

const ITEM_HEIGHT = 64;

type Props = {
  items: RadioItem[];
  value?: string;
  loading?: boolean;
  onChange: (value: string) => void;
};

function RadioList({ items, value, onChange, loading }: Props) {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebouncedValue(search, 300);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        if (item.value === value) return true;

        const itemText = item.text || item.value;
        return itemText.toLowerCase().includes(searchDebounced.toLowerCase());
      }),
    [items, searchDebounced]
  );

  const renderEmpty = () =>
    loading ? (
      <ActivityIndicator size="large" style={{ marginVertical: 32 }} />
    ) : (
      <Text>No data</Text>
    );

  const renderItem = ({ item }: { item: RadioItem }) => (
    <RadioListItem
      item={item}
      isSelected={item.value === value}
      onPress={() => onChange(item.value)}
    />
  );

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <FlashList
        data={filteredItems}
        extraData={[value, loading]}
        keyExtractor={(item) => item.value}
        renderItem={renderItem}
        initialScrollIndex={(() => {
          if (filteredItems.length === 0) return undefined;
          if (!value) return 0;

          const itemIndex = filteredItems.findIndex(
            (item) => item.value === value
          );

          return itemIndex - 2 < 0 ? 0 : itemIndex - 2;
        })()}
        ListEmptyComponent={renderEmpty}
        estimatedItemSize={ITEM_HEIGHT}
        renderScrollComponent={ScrollView}
      />
      <Searchbar
        placeholder="Search"
        style={{ marginHorizontal: 16 }}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

export default RadioList;
