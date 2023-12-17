import { ComponentPropsWithoutRef } from 'react';
import { Chip } from 'react-native-paper';

import FilterSeason from '.';

type Props = Omit<
  ComponentPropsWithoutRef<typeof FilterSeason>,
  'renderTrigger'
>;

function FilterSeasonChip({ initialValues, ...rest }: Props) {
  return (
    <FilterSeason
      {...rest}
      initialValues={initialValues}
      renderTrigger={({ openFilter }) => (
        <Chip textStyle={{ textTransform: 'capitalize' }} onPress={openFilter}>
          {initialValues
            ? `${initialValues.season} ${initialValues.year}`
            : 'Seasons'}
        </Chip>
      )}
    />
  );
}

export default FilterSeasonChip;
