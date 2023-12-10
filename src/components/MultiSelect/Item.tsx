import { memo } from 'react';
import { Checkbox, List } from 'react-native-paper';

import { MultiSelectItem } from './types';

const renderCheckbox = (selected?: boolean) => (
  <Checkbox status={selected ? 'checked' : 'unchecked'} />
);

type ItemProps = {
  item: MultiSelectItem;
  onPress: (item: MultiSelectItem) => void;
};

function Item({ item, onPress }: ItemProps) {
  return (
    <List.Item
      title={item.text || item.value}
      right={() => renderCheckbox(item.selected)}
      onPress={() => onPress(item)}
    />
  );
}

export default memo(Item);
