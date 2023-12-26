import { forwardRef } from 'react';

import PaperBottomSheetModal from '@/components/PaperBottomSheetModal';
import {
  BottomSheetFooterProps,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import ModalFooter, {
  FILTER_FOOTER_HEIGHT,
  ModalFooterProps,
} from './ModalFooter';

type Props = {
  children?: React.ReactNode;
} & Pick<BottomSheetModalProps, 'snapPoints' | 'onDismiss'> &
  Pick<ModalFooterProps, 'applyButtonProps' | 'clearButtonProps'>;

const Modal = forwardRef<BottomSheetModalMethods, Props>(
  ({ applyButtonProps, clearButtonProps, children, ...rest }, ref) => {
    // render
    const renderFooter =
      applyButtonProps || clearButtonProps
        ? (props: BottomSheetFooterProps) => (
            <ModalFooter
              {...props}
              clearButtonProps={clearButtonProps}
              applyButtonProps={applyButtonProps}
            />
          )
        : undefined;

    return (
      <PaperBottomSheetModal
        ref={ref}
        snapPoints={[350]}
        footerComponent={renderFooter}
        {...rest}
      >
        <BottomSheetView
          style={{
            flex: 1,
            marginBottom: renderFooter ? FILTER_FOOTER_HEIGHT : 0,
          }}
        >
          {children}
        </BottomSheetView>
      </PaperBottomSheetModal>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
