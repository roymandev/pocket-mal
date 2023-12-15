import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { AnimeSearchParams } from '@/types/api.types';
import { updateObject } from '@/utils/updateObject';
import { useDebouncedValue } from '@mantine/hooks';

import Filters from './Filters';
import ActiveFilters from './Filters/ActiveFilters';

type Props = {
  value: AnimeSearchParams;
  onChange: Dispatch<SetStateAction<AnimeSearchParams>>;
};

function Form({ value, onChange }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const updateValue = (values: AnimeSearchParams) =>
    onChange((prev) => updateObject(prev, values));

  useEffect(() => {
    updateValue({
      q: debouncedSearchQuery,
    });
  }, [debouncedSearchQuery]);

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ flex: 1 }}
        />

        <Filters
          filters={value}
          onUpdateFilter={updateValue}
          onClear={() => onChange({})}
        />
      </View>

      <ActiveFilters filters={value} onUpdateFilter={updateValue} />
    </View>
  );
}

export default Form;
