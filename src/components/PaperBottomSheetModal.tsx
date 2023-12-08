import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { BackHandler, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
  const innerRef = useRef<BottomSheetModalMethods>(null);
  const currentIndex = useRef<number>(-1);

  const renderContainer = useCallback(
    (props: { children?: React.ReactNode }) => (
      <SafeAreaView
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        {...props}
      />
    ),
    []
  );

  useImperativeHandle(ref, () => innerRef.current!, [innerRef.current]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (currentIndex.current >= 0) {
          innerRef.current?.dismiss();
          return true;
        }
        return false;
      }
    );
    return () => backHandler.remove();
  });

  return (
    <BottomSheetModal
      ref={innerRef}
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
        currentIndex.current = index;
        onChange?.(index);
      }}
      topInset={top}
      {...rest}
      containerComponent={renderContainer}
      stackBehavior="push"
    />
  );
});

PaperBottomSheetModal.displayName = 'PaperBottomSheetModal';

export default PaperBottomSheetModal;
