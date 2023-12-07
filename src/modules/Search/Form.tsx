import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { AnimeSearchParams } from '@/types/api.types';
import { useDebouncedValue, useUncontrolled } from '@mantine/hooks';

import ActiveFilters from './ActiveFilters';
import Filters from './Filters';

type Props = {
  value?: AnimeSearchParams;
  onSubmit?: (value: AnimeSearchParams) => void;
};

function Form({ value, onSubmit }: Props) {
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue: {},
    onChange: onSubmit,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const [params, setParams] = useState<AnimeSearchParams>(_value);

  useEffect(() => {
    setValue({
      ...params,
      q: debouncedSearchQuery,
    });
  }, [params, debouncedSearchQuery]);

  return (
    <View>
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
          values={params}
          onSubmit={setParams}
          onClear={() => setParams({})}
        />
      </View>

      <ActiveFilters values={params} onChange={setParams} />
    </View>
  );
}

export default Form;
