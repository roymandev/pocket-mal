import { useMemo } from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Chip,
  Divider,
  Text,
} from 'react-native-paper';

import MultiSelect from '@/components/MultiSelect';
import { MultiSelectItem } from '@/components/MultiSelect/types';
import { useObjectState } from '@/hooks/useObjectState';
import { useAnimeGenres } from '@/queries/genresQueries';

import { ParsedValues } from './types';

type Props = {
  value: ParsedValues;
  onChange: (values: ParsedValues) => void;
};

function Form({ value, onChange }: Props) {
  const { data: genres, isLoading } = useAnimeGenres();

  const [, handleState] = useObjectState({ value, onChange });

  const options = useMemo(() => {
    if (!genres) return [];

    return genres
      .reduce<MultiSelectItem[]>((acc, curr) => {
        if (!curr.mal_id) return acc;

        acc.push({
          value: curr.mal_id.toString(),
          text: curr.name,
        });
        return acc;
      }, [])
      .sort((a, b) => a.text?.localeCompare(b.text || '') || 0);
  }, [genres]);

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginVertical: 32 }} />;

  return (
    <View
      style={{
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
          options={options}
          initialValues={value.genres}
          unavailableValues={value.genres_exclude}
          onChange={(newValue) => handleState.update('genres', newValue)}
          renderTrigger={({ onPress }) => (
            <Button onPress={onPress}>Add</Button>
          )}
          snapPoints={['100%']}
        />
      </View>

      {value.genres && value.genres.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 8,
          }}
        >
          {value.genres.map((id) => {
            const deselect = () =>
              handleState.update(
                'genres',
                value.genres?.filter((i) => i !== id)
              );
            return (
              <Chip key={id} onClose={deselect} onPress={deselect}>
                {options.find((i) => i.value === id)?.text}
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
          options={options}
          initialValues={value.genres_exclude || []}
          unavailableValues={value.genres || []}
          onChange={(genres_exclude) =>
            handleState.update('genres_exclude', genres_exclude)
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
        {value.genres_exclude?.map((id) => {
          const deselect = () =>
            handleState.update(
              'genres_exclude',
              value.genres_exclude?.filter((i) => i !== id)
            );
          return (
            <Chip key={id} onClose={deselect} onPress={deselect}>
              {options.find((i) => i.value === id)?.text}
            </Chip>
          );
        })}
      </View>
    </View>
  );
}

export default Form;
