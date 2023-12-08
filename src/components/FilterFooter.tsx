import { Button, useTheme } from 'react-native-paper';

import {
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';

type Props = BottomSheetFooterProps & {
  clearButtonProps?: {
    onPress?: () => void;
    disabled?: boolean;
  };
  applyButtonProps?: {
    onPress?: () => void;
  };
};

function FilterFooter({ clearButtonProps, applyButtonProps, ...rest }: Props) {
  const theme = useTheme();
  return (
    <BottomSheetFooter
      {...rest}
      style={{
        padding: 16,
        flexDirection: 'row',
        gap: 8,
        backgroundColor: theme.colors.surface,
      }}
    >
      <Button mode="text" {...clearButtonProps}>
        Clear
      </Button>
      <Button
        mode="contained"
        style={{
          flex: 1,
        }}
        {...applyButtonProps}
      >
        Apply
      </Button>
    </BottomSheetFooter>
  );
}

export default FilterFooter;
