import { memo } from 'react';
import { Checkbox, List } from 'react-native-paper';

import { MultiSelectItem } from './types';

const renderCheckbox = ({
  selected,
  ...rest
}: {
  selected?: boolean;
  disabled?: boolean;
}) => <Checkbox status={selected ? 'checked' : 'unchecked'} {...rest} />;

type ItemProps = {
  item: MultiSelectItem;
  onPress: (item: MultiSelectItem) => void;
};

function Item({ item, onPress }: ItemProps) {
  return (
    <List.Item
      title={item.text || item.value}
      right={() =>
        renderCheckbox({
          selected: item.selected || item.unavailable,
          disabled: item.unavailable,
        })
      }
      onPress={() => onPress(item)}
      disabled={item.unavailable}
      titleStyle={{
        opacity: item.unavailable ? 0.5 : 1,
      }}
    />
  );
}

export default memo(Item);
