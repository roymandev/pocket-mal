import { useCallback, useMemo } from 'react';
import { Checkbox, List as PaperList, Text } from 'react-native-paper';

import { components } from '@/schema';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

const renderCheckbox = (checked: boolean, isDisabled: boolean) => (
  <Checkbox status={checked ? 'checked' : 'unchecked'} disabled={isDisabled} />
);

type Props = {
  filter: string;
  sections: {
    title: string;
    data: components['schemas']['genre'][];
  }[];
  selectedGenres: number[];
  disabledGenres: number[];
  onItemPress: (id: number, isSelected: boolean) => void;
};

function List({
  filter,
  sections,
  selectedGenres,
  disabledGenres,
  onItemPress,
}: Props) {
  const filteredData = useMemo(
    () =>
      sections.reduce<typeof sections>((acc, { title, data }) => {
        const items = data.filter(
          (item) => item.name?.toLowerCase().includes(filter.toLowerCase())
        );
        if (items.length) {
          acc.push({ title, data: items });
        }
        return acc;
      }, []),
    [sections, filter]
  );

  const renderItem = useCallback(
    (props: { item: components['schemas']['genre'] }) => {
      const selectedIndex = selectedGenres.findIndex(
        (i) => i === props.item.mal_id
      );
      const isDisabled =
        disabledGenres.findIndex((i) => i === props.item.mal_id) !== -1;
      const isSelected = selectedIndex !== -1 || isDisabled;

      const handlePress = () => {
        if (props.item.mal_id) {
          onItemPress(props.item.mal_id, isSelected);
        }
      };

      const renderRight = () => renderCheckbox(isSelected, isDisabled);

      return (
        <PaperList.Item
          title={props.item.name}
          onPress={handlePress}
          disabled={isDisabled}
          right={renderRight}
        />
      );
    },
    [filteredData, selectedGenres, disabledGenres]
  );

  return (
    <BottomSheetSectionList
      sections={filteredData}
      keyExtractor={(item) => item.mal_id?.toString() || ''}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          variant="titleMedium"
          style={{
            marginHorizontal: 16,
            marginVertical: 8,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      )}
      renderItem={renderItem}
    />
  );
}

export default List;
