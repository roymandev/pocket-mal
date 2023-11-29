import { View } from 'react-native';
import { Chip } from 'react-native-paper';

type Props<T> = {
  data: T[] | readonly T[];
  mapItem: (item: T) => {
    value: T;
    text?: string;
  };
  selected?: T;
  setSelected: (value?: T) => void;
};

function ChipSelect<T extends string | number>({
  data: readonlyData,
  mapItem,
  selected,
  setSelected,
}: Props<T>) {
  const data = [...readonlyData];

  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 8 }}>
      {data.map((item) => {
        const { value, text } = mapItem(item);
        const isSelected = selected === value;

        return (
          <Chip
            key={value}
            onPress={() => {
              setSelected(isSelected ? undefined : value);
            }}
            selected={isSelected}
            mode={isSelected ? 'flat' : 'outlined'}
          >
            {text || value}
          </Chip>
        );
      })}
    </View>
  );
}

export default ChipSelect;
