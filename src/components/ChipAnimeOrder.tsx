import { Chip } from 'react-native-paper';

import { AnimeSearchParams } from '@/types/api.types';

import AnimeOrderSelect, {
  AnimeOrderSelectTriggerProps,
} from './AnimeOrderSelect';

type Values = Pick<AnimeSearchParams, 'order_by' | 'sort'>;

type Props = {
  values: Values;
  onChange: (values: Values) => void;
};

const renderTrigger = ({ current, onPress }: AnimeOrderSelectTriggerProps) => (
  <Chip
    icon={current.value.sort === 'asc' ? 'sort-ascending' : 'sort-descending'}
    onPress={onPress}
  >
    {current.text}
  </Chip>
);

function ChipAnimeOrder({ values, onChange }: Props) {
  return (
    <AnimeOrderSelect
      value={{
        order_by: values.order_by,
        sort: values.sort,
      }}
      onChange={onChange}
      trigger={renderTrigger}
    />
  );
}

export default ChipAnimeOrder;
