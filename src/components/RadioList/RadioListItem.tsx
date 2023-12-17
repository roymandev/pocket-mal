import { memo } from 'react';
import { List, RadioButton } from 'react-native-paper';

import { RadioItem } from './type';

type Props = {
  item: RadioItem;
  isSelected: boolean;
  onPress: (item: RadioItem) => void;
};

function RadioListItem({ item, isSelected, onPress }: Props) {
  return (
    <List.Item
      title={item.text || item.value}
      left={() => (
        <RadioButton
          value={item.value}
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => onPress(item)}
        />
      )}
      onPress={() => onPress(item)}
      style={{ paddingHorizontal: 16 }}
    />
  );
}

export default memo(RadioListItem);
