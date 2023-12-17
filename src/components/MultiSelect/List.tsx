import { useCallback, useEffect, useState } from 'react';

import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import Item from './Item';
import { MultiSelectItem } from './types';

type Props = {
  options: MultiSelectItem[];
  initialValues: string[];
  unavailableValues?: string[];
  onChange: (values: string[]) => void;
};

function List({ options, initialValues, unavailableValues, onChange }: Props) {
  const [data, setData] = useState<MultiSelectItem[]>([]);

  // Initialize data
  useEffect(() => {
    setData(
      options.map((option) => {
        const isSelected = initialValues.some(
          (value) => value === option.value
        );

        const isUnavailable = unavailableValues?.some(
          (value) => value === option.value
        );

        return {
          ...option,
          selected: isSelected,
          unavailable: isUnavailable,
        };
      })
    );
  }, []);

  const onItemPress = useCallback((item: MultiSelectItem) => {
    setData((prev) => {
      const updatedData = prev.map((i) =>
        i.value === item.value ? { ...i, selected: !i.selected } : i
      );

      const newValues = updatedData.reduce<string[]>((acc, curr) => {
        if (curr.selected) {
          acc.push(curr.value);
        }
        return acc;
      }, []);

      onChange(newValues);

      return updatedData;
    });
  }, []);

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => <Item item={item} onPress={onItemPress} />}
    />
  );
}

export default List;
