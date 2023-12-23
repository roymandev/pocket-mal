import { Chip, ChipProps } from 'react-native-paper';

import { FilterBaseTriggerProps } from './types';

type Props = ChipProps & FilterBaseTriggerProps;

function ChipFilter(props: Props) {
  return <Chip {...props} />;
}

export default ChipFilter;
