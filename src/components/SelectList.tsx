import { Key, memo, useCallback, useRef, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Checkbox, List } from 'react-native-paper';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useDidUpdate } from '@mantine/hooks';

export type BaseSelectListItem<T = Key> = {
  value: T;
  text?: string;
  selected?: boolean;
  disabled?: boolean;
};

const renderCheckbox = (selected?: boolean, disabled?: boolean) => (
  <Checkbox
    status={selected || disabled ? 'checked' : 'unchecked'}
    disabled={disabled}
  />
);

type ItemProps = {
  item: BaseSelectListItem;
  onPress: (item: BaseSelectListItem) => void;
};

const Item = memo(({ item, onPress }: ItemProps) => (
  <List.Item
    title={item.text || item.value.toString()}
    onPress={() => onPress(item)}
    disabled={item.disabled}
    right={() => renderCheckbox(item.selected, item.disabled)}
  />
));

type Props<T extends BaseSelectListItem> = {
  values?: T[];
  onChange?: (values: T[]) => void;
  search?: string;
  watch?: unknown[];
};

function SelectList<T extends BaseSelectListItem>({
  values,
  onChange,
  search,
  watch = [],
}: Props<T>) {
  const [_values, setValues] = useState<T[]>(values || []);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useDidUpdate(() => {
    setValues(values || []);
  }, [...watch]);

  useDidUpdate(() => {
    timeoutRef.current = setTimeout(() => {
      onChange?.(_values);
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [_values]);

  const itemPressHandler = useCallback(
    (item: BaseSelectListItem) =>
      setValues((prev) =>
        prev.map((i) =>
          i.value === item.value ? { ...i, selected: !i.selected } : i
        )
      ),
    []
  );

  const renderItem = ({ item }: ListRenderItemInfo<T>) => {
    if (search && !item.text?.toLowerCase().includes(search.toLowerCase())) {
      return null;
    }

    return <Item item={item} onPress={itemPressHandler} />;
  };

  return (
    <BottomSheetFlatList
      data={_values}
      keyExtractor={(item) => item.value.toString()}
      renderItem={renderItem}
    />
  );
}

export default SelectList;
