import { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Searchbar, SegmentedButtons } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/animeQueries';
import { BottomSheetFooterProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';

import FilterFooter, { FILTER_FOOTER_HEIGHT } from './FilterFooter';
import PaperBottomSheetModal from './PaperBottomSheetModal';
import SelectList, { BaseSelectListItem } from './SelectList';

const parseGenres = (genres?: string) => genres?.split(',').map(Number) || [];

type Value = {
  genres?: string;
  genres_exclude?: string;
};

export type AnimeGenresSelectTriggerProps = {
  selectedLength: number | null;
  onPress: () => void;
};

type FormProps = {
  initialValues: Value;
  onChange: (value: Value) => void;
};

function Form({ initialValues, onChange }: FormProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);

  const [type, setType] = useState<'includes' | 'excludes'>('includes');

  const [includes, setIncludes] = useState<number[]>(
    parseGenres(initialValues.genres)
  );
  const [excludes, setExcludes] = useState<number[]>(
    parseGenres(initialValues.genres_exclude)
  );

  useDidUpdate(() => {
    onChange({
      genres: includes.length ? includes.join(',') : undefined,
      genres_exclude: excludes.length ? excludes.join(',') : undefined,
    });
  }, [includes, excludes]);

  useDidUpdate(() => {
    setIncludes(initialValues.genres?.split(',').map(Number) || []);
    setExcludes(initialValues.genres_exclude?.split(',').map(Number) || []);
  }, [initialValues]);

  const { data: explicitGenres } = useAnimeGenres({
    filter: 'explicit_genres',
  });
  const { data: genresData } = useAnimeGenres(undefined, !!explicitGenres);

  const transformedGenres = useMemo(() => {
    if (!genresData) return [];

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

  return (
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
  );
}

const EMTPY_VALUE: Value = {
  genres: undefined,
  genres_exclude: undefined,
};

type Props = {
  trigger: (props: AnimeGenresSelectTriggerProps) => React.ReactNode;
  initialValues: Value;
  onApply: (value: Value) => void;
};

function AnimeGenresSelect({ initialValues, onApply, trigger }: Props) {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [values, setValues] = useState(initialValues);

  const valuesLength =
    (initialValues?.genres?.split(',').length || 0) +
    (initialValues?.genres_exclude?.split(',').length || 0);

  const onApplyHanlder = () => {
    onApply(values);
    bottomSheetRef.current?.close();
  };

  // render
  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <FilterFooter
        {...props}
        clearButtonProps={{
          disabled: valuesLength === 0,
          onPress: () => setValues(EMTPY_VALUE),
        }}
        applyButtonProps={{
          onPress: onApplyHanlder,
        }}
      />
    ),
    [initialValues, bottomSheetRef.current]
  );

  return (
    <>
      {trigger({
        selectedLength: valuesLength || null,
        onPress: () => bottomSheetRef.current?.present(),
      })}

      <PaperBottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['100%']}
        footerComponent={renderFooter}
      >
        <Form initialValues={initialValues} onChange={setValues} />
      </PaperBottomSheetModal>
    </>
  );
}

export default AnimeGenresSelect;
