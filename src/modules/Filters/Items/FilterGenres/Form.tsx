import { useMemo } from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Chip,
  Divider,
  Text,
} from 'react-native-paper';

import { ObjectStateUpdate } from '@/hooks/useObjectState';
import { useAnimeGenres } from '@/queries/genresQueries';

import MultiSelect from '../../../../components/MultiSelect';
import { MultiSelectItem } from '../../../../components/MultiSelect/types';
import { FILTER_FOOTER_HEIGHT } from '../../ModalFooter';
import { ParsedValues } from './types';

type Props = {
  values: ParsedValues;
  updateValues: ObjectStateUpdate<ParsedValues>;
};

function Form({ values, updateValues }: Props) {
  const { data: genres, isLoading } = useAnimeGenres();

  const transformedGenres = useMemo(() => {
    if (!genres) return [];

    return genres.reduce<MultiSelectItem[]>((acc, curr) => {
      if (!curr.mal_id) return acc;

      acc.push({
        value: curr.mal_id.toString(),
        text: curr.name,
      });
      return acc;
    }, []);
  }, [genres]);

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
          title="Include genres"
          options={transformedGenres}
          initialValues={values.genres}
          unavailableValues={values.genres_exclude}
          onChange={(value) => updateValues('genres', value)}
          renderTrigger={({ onPress }) => (
            <Button onPress={onPress}>Add</Button>
          )}
          snapPoints={['100%']}
        />
      </View>

      {values.genres && values.genres.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 8,
          }}
        >
          {values.genres.map((id) => {
            const deselect = () =>
              updateValues('genres', values.genres?.filter((i) => i !== id));
            return (
              <Chip key={id} onClose={deselect} onPress={deselect}>
                {transformedGenres.find((i) => i.value === id)?.text}
              </Chip>
            );
          })}
        </View>
      )}

      <Divider style={{ marginVertical: 16 }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant="titleMedium">Exclude genres</Text>
        <MultiSelect
          title="Exclude genres"
          options={transformedGenres}
          initialValues={values.genres_exclude || []}
          unavailableValues={values.genres || []}
          onChange={(genres_exclude) =>
            updateValues('genres_exclude', genres_exclude)
          }
          renderTrigger={({ onPress }) => (
            <Button onPress={onPress}>Add</Button>
          )}
          snapPoints={['100%']}
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
        {values.genres_exclude?.map((id) => {
          const deselect = () =>
            updateValues(
              'genres_exclude',
              values.genres_exclude?.filter((i) => i !== id)
            );
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
