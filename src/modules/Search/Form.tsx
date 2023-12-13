import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { AnimeSearchParams } from '@/types/api.types';
import { updateObject } from '@/utils/updateObject';
import { useDebouncedValue } from '@mantine/hooks';

import Filters from './Filters';
import ActiveFilters from './Filters/ActiveFilters';

type Props = {
  onSubmit: (value: AnimeSearchParams) => void;
};

function Form({ onSubmit }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const [filters, setFilters] = useState<AnimeSearchParams>({});

  useEffect(() => {
    onSubmit({ ...filters, q: debouncedSearchQuery });
  }, [filters, debouncedSearchQuery]);

  const updateParams = (values: AnimeSearchParams) =>
    setFilters((prev) => updateObject(prev, values));

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
          filters={filters}
          onUpdateFilter={updateParams}
          onClear={() => setFilters({})}
        />
      </View>

      <ActiveFilters filters={filters} onUpdateFilter={updateParams} />
    </View>
  );
}

export default Form;
