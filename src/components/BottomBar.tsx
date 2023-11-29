import { ComponentPropsWithoutRef } from 'react';
import { Appbar, FAB, useTheme } from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

type Props = {
  children?: React.ReactNode;
  fabProps?: Omit<
    ComponentPropsWithoutRef<typeof FAB>,
    'mode' | 'size' | 'style'
  >;
};

function BottomBar({ children, fabProps }: Props) {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar.Header
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      {children}
      {fabProps && (
        <FAB
          mode="flat"
          size="medium"
          icon="check"
          style={[
            {
              position: 'absolute',
              right: 16,
            },
            { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
          ]}
          {...fabProps}
        />
      )}
    </Appbar.Header>
  );
}

export default BottomBar;
