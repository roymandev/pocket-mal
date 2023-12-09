import { useCallback, useRef, useState as useSetState } from 'react';
import { View } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/animeQueries';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDebouncedValue, useListState } from '@mantine/hooks';

import FilterFooter, { FILTER_FOOTER_HEIGHT } from '../FilterFooter';
import PaperBottomSheetModal from '../PaperBottomSheetModal';
import List from './List';

type Value = {
  genres?: string;
  genres_exclude?: string;
};

export type AnimeGenresSelectTriggerProps = {
  selectedLength: number | null;
  onPress: () => void;
};

type Props = {
  trigger: (props: AnimeGenresSelectTriggerProps) => React.ReactNode;
  values?: Value;
  onApply: (value: Value) => void;
};

function AnimeGenresSelect({ values, onApply, trigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [query, setQuery] = useSetState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const [type, setType] = useSetState<'includes' | 'excludes'>('includes');

  const valuesLength =
    (values?.genres?.split(',').length || 0) +
    (values?.genres_exclude?.split(',').length || 0);

  const [includes, handleIncludes] = useListState<number>([]);
  const [excludes, handleExcludes] = useListState<number>([]);

  const { data: genresData } = useAnimeGenres({ filter: 'genres' });
  const { data: themesData } = useAnimeGenres({ filter: 'themes' });
  const { data: demographicsData } = useAnimeGenres({ filter: 'demographics' });

  const onApplyHanlder = () => {
    onApply({
      genres: includes.join(',') || undefined,
      genres_exclude: excludes.join(',') || undefined,
    });
    bottomSheetRef.current?.close();
  };

  const handleItemPress = (item: number, isSelected: boolean) => {
    if (type === 'includes') {
      const itemIndex = includes.findIndex((i) => i === item);
      if (isSelected) {
        handleIncludes.remove(itemIndex);
      } else {
        handleIncludes.append(item);
      }
    }
    if (type === 'excludes') {
      if (isSelected) {
        const itemIndex = excludes.findIndex((i) => i === item);
        handleExcludes.remove(itemIndex);
      } else {
        handleExcludes.append(item);
      }
    }
  };

  // callbacks
  const handlePresentModalPress = () => {
    bottomSheetRef.current?.present();

    if (values) {
      handleIncludes.setState(values.genres?.split(',').map(Number) || []);
      handleExcludes.setState(
        values.genres_exclude?.split(',').map(Number) || []
      );
    }
  };

  // render
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          disabled: includes.length === 0 && excludes.length === 0,
          onPress: () => {
            handleIncludes.setState([]);
            handleExcludes.setState([]);
          },
        }}
        applyButtonProps={{
          onPress: onApplyHanlder,
        }}
      />
    ),
    [includes, excludes, bottomSheetRef.current]
  );

  return (
    <>
      {trigger({
        selectedLength: valuesLength || null,
        onPress: handlePresentModalPress,
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['100%']}
        footerComponent={renderFooter}
      >
        <View style={{ flex: 1, marginBottom: FILTER_FOOTER_HEIGHT, gap: 16 }}>
          <View style={{ gap: 16, marginHorizontal: 16 }}>
            <SegmentedButtons
              value={type}
              onValueChange={(value) => setType(value as typeof type)}
              buttons={[
                {
                  value: 'includes',
                  label: `Includes ( ${includes.length} )`,
                },
                {
                  value: 'excludes',
                  label: `Excludes ( ${excludes.length} )`,
                },
              ]}
            />
            <Searchbar
              placeholder="Search genres"
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <List
            sections={[
              {
                title: 'Genres',
                data: genresData?.data || [],
              },
              {
                title: 'Themes',
                data: themesData?.data || [],
              },
              {
                title: 'Demographics',
                data: demographicsData?.data || [],
              },
            ]}
            filter={debouncedQuery}
            selectedGenres={type === 'includes' ? includes : excludes}
            disabledGenres={type === 'includes' ? excludes : includes}
            onItemPress={handleItemPress}
          />
        </View>
      </PaperBottomSheetModal>
    </>
  );
}

export default AnimeGenresSelect;
