import { useState } from 'react';
import { View } from 'react-native';
import { Badge, IconButton, Searchbar } from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';

import InfiniteAnime from '@/components/InfiniteAnime';
import ModalFilter from '@/components/Search/ModalFilter';
import { useInfiniteAnime } from '@/queries/animeQueries';
import { operations } from '@/schema';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';

function SearchPage() {
  const [showFilter, handlerShowFilter] = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const [activeFilter, setActiveFilter] = useState<
    NonNullable<operations['getAnimeSearch']['parameters']['query']>
  >({});

  const query = useInfiniteAnime({
    q: debouncedSearchQuery,
    ...activeFilter,
  });

  const applyFilter = (
    filter: Partial<operations['getAnimeSearch']['parameters']['query']>
  ) => {
    setActiveFilter({
      ...filter,
    });
    handlerShowFilter.close();
  };

  const closeModalHandler = () => {
    handlerShowFilter.close();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            margin: 16,
          }}
        >
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1 }}
          />

          <View>
            <IconButton icon="filter" onPress={handlerShowFilter.open} />
            {Object.keys(activeFilter).length > 0 && (
              <Badge style={{ position: 'absolute', top: 0, right: 0 }}>
                {Object.keys(activeFilter).length}
              </Badge>
            )}
          </View>
        </View>

        <InfiniteAnime {...query} />
      </SafeAreaView>

      <ModalFilter
        visible={showFilter}
        onDismiss={closeModalHandler}
        initialValues={activeFilter}
        onApply={applyFilter}
      />
    </>
  );
}

export default SearchPage;
