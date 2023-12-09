import { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Chip, List, Searchbar, Text } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/animeQueries';
import { components } from '@/schema';
import {
  BottomSheetFlatList,
  BottomSheetFooterProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useDebouncedValue, useListState } from '@mantine/hooks';

import FilterFooter, { FILTER_FOOTER_HEIGHT } from './FilterFooter';
import PaperBottomSheetModal from './PaperBottomSheetModal';

export type AnimeGenresSelectTriggerProps = {
  selectedLength: number | null;
  onPress: () => void;
};

const renderCheckbox = (checked: boolean) => (
  <Checkbox status={checked ? 'checked' : 'unchecked'} />
);

type Props = {
  trigger: (props: AnimeGenresSelectTriggerProps) => React.ReactNode;
  title: string;
  value?: string;
  onChange: (value?: string) => void;
};

function AnimeGenresSelect({ value, onChange, title, trigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const [selected, handleSelected] = useListState<
    components['schemas']['genre']
  >([]);

  const { data } = useAnimeGenres({ filter: 'genres' });
  const filteredGenres = useMemo(
    () =>
      data?.data?.filter(
        (item) =>
          item.name?.toLowerCase().includes(debouncedQuery.toLowerCase())
      ) || [],
    [data?.data, debouncedQuery]
  );

  const onChangeHandler = () => {
    onChange(selected.map((item) => item.mal_id).join(',') || undefined);
    bottomSheetRef.current?.close();
  };

  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();

    if (data?.data && value) {
      const genreIds = value.split(',');
      handleSelected.setState(
        data.data.filter(
          (item) => item.mal_id && genreIds.includes(item.mal_id.toString())
        )
      );
    }
  };

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          disabled: selected.length === 0,
          onPress: () => {
            handleSelected.setState([]);
          },
        }}
        applyButtonProps={{
          onPress: onChangeHandler,
        }}
      />
    ),
    [selected, bottomSheetRef.current]
  );

  return (
    <>
      {trigger({
        selectedLength: value ? value.split(',').length : null,
        onPress: handlePresentModalPress,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['100%']}
        footerComponent={renderFooter}
      >
        <View style={{ flex: 1, marginBottom: FILTER_FOOTER_HEIGHT, gap: 16 }}>
          <View style={{ gap: 16, marginHorizontal: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text variant="titleLarge">{title}</Text>
              <Chip>{selected.length}</Chip>
            </View>
            <Searchbar
              placeholder="Search genres"
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <BottomSheetFlatList
            data={filteredGenres}
            keyExtractor={(item) => item.mal_id?.toString() || ''}
            renderItem={({ item }) => {
              const selectedIndex = selected.findIndex(
                (i) => i.mal_id === item.mal_id
              );
              const isSelected = selectedIndex !== -1;

              const onPressHandler = () => {
                if (selectedIndex === -1) {
                  handleSelected.append(item);
                } else {
                  handleSelected.remove(selectedIndex);
                }
              };

              return (
                <List.Item
                  title={item.name}
                  onPress={onPressHandler}
                  style={{
                    height: 52,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  right={() => renderCheckbox(isSelected)}
                />
              );
            }}
          />
        </View>
      </PaperBottomSheetModal>
    </>
  );
}

export default AnimeGenresSelect;
