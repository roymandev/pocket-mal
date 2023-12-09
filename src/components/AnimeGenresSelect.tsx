import {
  useCallback,
  useMemo,
  useRef,
  useState as useSetState,
  useState,
} from 'react';
import { View } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/animeQueries';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDebouncedValue } from '@mantine/hooks';

import FilterFooter, { FILTER_FOOTER_HEIGHT } from './FilterFooter';
import PaperBottomSheetModal from './PaperBottomSheetModal';
import SelectList, { BaseSelectListItem } from './SelectList';

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

  const [includes, setIncludes] = useState<number[]>([]);
  const [excludes, setExcludes] = useState<number[]>([]);

  const { data: explicitGenres } = useAnimeGenres({
    filter: 'explicit_genres',
  });
  const { data: genresData } = useAnimeGenres(undefined, !!explicitGenres);

  const transformedGenres = useMemo(() => {
    if (!genresData || !values) return [];

    const selectedList = type === 'includes' ? includes : excludes;
    const disabledList = type === 'includes' ? excludes : includes;

    return genresData.reduce<BaseSelectListItem<number>[]>((acc, curr) => {
      if (explicitGenres?.some((genre) => genre.mal_id === curr.mal_id)) {
        return acc;
      }
      if (!curr.mal_id) return acc;

      const selected = selectedList.includes(curr.mal_id);
      const disabled = disabledList.includes(curr.mal_id);

      acc.push({
        value: curr.mal_id,
        text: curr.name,
        selected,
        disabled,
      });
      return acc;
    }, []);
  }, [genresData, includes, excludes, type]);

  const onApplyHanlder = () => {
    onApply({
      genres: includes.join(',') || undefined,
      genres_exclude: excludes.join(',') || undefined,
    });
    bottomSheetRef.current?.close();
  };

  const triggerPressHandler = () => {
    bottomSheetRef.current?.present();
    if (values) {
      setIncludes(values.genres?.split(',').map(Number) || []);
      setExcludes(values.genres_exclude?.split(',').map(Number) || []);
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
            setIncludes([]);
            setExcludes([]);
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
        onPress: triggerPressHandler,
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

          <SelectList
            values={transformedGenres}
            search={debouncedQuery}
            onChange={(genres) => {
              const ids = genres.reduce<number[]>((acc, curr) => {
                if (curr.selected) {
                  acc.push(curr.value);
                }
                return acc;
              }, []);
              if (type === 'includes') {
                setIncludes(ids);
              } else {
                setExcludes(ids);
              }
            }}
            watch={[type]}
          />
        </View>
      </PaperBottomSheetModal>
    </>
  );
}

export default AnimeGenresSelect;
