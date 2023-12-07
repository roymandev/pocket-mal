import { forwardRef } from 'react';
import { Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={-1}
    disappearsOnIndex={2}
    style={{
      pointerEvents: 'auto',
    }}
  />
);

const PaperBottomSheetModal = forwardRef<
  BottomSheetModalMethods,
  BottomSheetModalProps
>(({ onChange, ...rest }, ref) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={ref}
      handleStyle={{
        paddingTop: 22,
        paddingBottom: 22,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.onSurfaceVariant,
      }}
      backgroundStyle={{ backgroundColor: theme.colors.surface }}
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index >= 0) Keyboard.dismiss();
        onChange?.(index);
      }}
      topInset={top}
      {...rest}
    />
  );
});

PaperBottomSheetModal.displayName = 'PaperBottomSheetModal';

export default PaperBottomSheetModal;
