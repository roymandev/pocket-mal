import { ActivityIndicator, Chip, ChipProps } from 'react-native-paper';

import { FilterBaseTriggerProps } from './types';

type Props = ChipProps & FilterBaseTriggerProps;

function ChipFilter({ children, isLoading, ...props }: Props) {
  return (
    <Chip {...props} compact>
      {isLoading ? <ActivityIndicator size={16} /> : children}
    </Chip>
  );
}

export default ChipFilter;
