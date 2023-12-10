import { useCallback, useEffect, useState } from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import Item from './Item';
import { MultiSelectItem } from './types';

type Props = {
  options: MultiSelectItem[];
  values: string[];
  onChange: (values: string[]) => void;
};

function List({ options, values, onChange }: Props) {
  const [data, setData] = useState<MultiSelectItem[]>(
    options.map((option) => ({
      ...option,
      selected: values.some((value) => value === option.value),
    }))
  );

  useEffect(() => {
    onChange(
      data.reduce<string[]>((acc, curr) => {
        if (curr.selected) {
          acc.push(curr.value);
        }
        return acc;
      }, [])
    );
  }, [data]);

  const onPress = useCallback(
    (item: MultiSelectItem) => {
      setData((prev) =>
        prev.map((i) =>
          i.value === item.value ? { ...i, selected: !i.selected } : i
        )
      );
    },
    [options]
  );

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => <Item item={item} onPress={onPress} />}
    />
  );
}

export default List;
