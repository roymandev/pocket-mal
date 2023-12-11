import { useMemo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Chip, Text } from 'react-native-paper';

import { useAnimeGenres } from '@/queries/animeQueries';

import { FILTER_FOOTER_HEIGHT } from '../FilterFooter';
import MultiSelect from '../MultiSelect';
import { MultiSelectItem } from '../MultiSelect/types';
import { AnimeGenresSelectValue } from './types';

type Props = {
  values: AnimeGenresSelectValue;
  onChange: (value: AnimeGenresSelectValue) => void;
};

function Form({ values, onChange }: Props) {
  const { data: explicitGenres } = useAnimeGenres({
    filter: 'explicit_genres',
  });
  const { data: genresData, isLoading } = useAnimeGenres(
    undefined,
    !!explicitGenres
  );

  const transformedGenres = useMemo(() => {
    if (!genresData) return [];

    return genresData.reduce<MultiSelectItem[]>((acc, curr) => {
      if (explicitGenres?.some((genre) => genre.mal_id === curr.mal_id)) {
        return acc;
      }
      if (!curr.mal_id) return acc;

      acc.push({
        value: curr.mal_id.toString(),
        text: curr.name,
      });
      return acc;
    }, []);
  }, [genresData]);

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginVertical: 32 }} />;

  return (
    <View
      style={{
        flex: 1,
        marginBottom: FILTER_FOOTER_HEIGHT,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="titleMedium">Include genres</Text>

        <MultiSelect
          options={transformedGenres}
          initialValues={values.genres || []}
          onChange={(genres) => onChange({ genres })}
          renderTrigger={({ onPress }) => (
            <Button onPress={onPress}>Add</Button>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 8,
        }}
      >
        {values.genres?.map((id) => {
          const deselect = () => {
            onChange({
              genres: values.genres?.filter((i) => i !== id),
            });
          };
          return (
            <Chip key={id} onClose={deselect} onPress={deselect}>
              {transformedGenres.find((i) => i.value === id)?.text}
            </Chip>
          );
        })}
      </View>
    </View>
  );
}

export default Form;
