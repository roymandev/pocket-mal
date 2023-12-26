import { Button, useTheme } from 'react-native-paper';

import {
  BottomSheetFooter,
  BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';

export const FILTER_FOOTER_HEIGHT = 72;

export type ModalFooterProps = BottomSheetFooterProps & {
  clearButtonProps?: {
    onPress?: () => void;
    disabled?: boolean;
  };
  applyButtonProps?: {
    disabled?: boolean;
    onPress?: () => void;
  };
};

function ModalFooter({
  clearButtonProps,
  applyButtonProps,
  ...rest
}: ModalFooterProps) {
  const theme = useTheme();

  return (
    <BottomSheetFooter
      {...rest}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        height: FILTER_FOOTER_HEIGHT,
        backgroundColor: theme.colors.surface,
      }}
    >
      {clearButtonProps && (
        <Button mode="text" {...clearButtonProps}>
          Clear
        </Button>
      )}
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

export default ModalFooter;
