import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useFocusOnFirstFocusable from '~/pages/modal/hooks/useFocusOnFirstFocusable';
import usePreviousFocus from '~/pages/modal/hooks/usePreviousFocus';
import useTrapFocus from '~/pages/modal/hooks/useTrapFocus';

import './styles.scss';

interface ModalOverlayProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
  overlayStyle?: CSSProperties;
  contentRootStyle?: CSSProperties;
  onRequestClose?: () => void;
  shouldCloseOnOverlayClick?: boolean;
}

const createModalPortal = () => {
  const $modalPortal = document.createElement('div');
  $modalPortal.className = 'modal-portal';
  return $modalPortal;
};

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return <div className="modal-overlay" {...props} />;
};

const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  overlayStyle,
  contentRootStyle,
  onRequestClose,
  shouldCloseOnOverlayClick = false,
}) => {
  const portalRef = useRef<HTMLDivElement>(createModalPortal());
  const contentRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $portal = portalRef.current;
    document.body.append($portal);

    return () => {
      document.body.removeChild($portal);
    };
  }, []);

  usePreviousFocus({ isOpen });

  useFocusOnFirstFocusable({ isOpen, contentRootRef });

  useTrapFocus({ isOpen, contentRootRef });

  const handleClickOverlay = () => {
    if (shouldCloseOnOverlayClick) onRequestClose?.();
  };

  const handlePressEscapeKey: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      onRequestClose?.();
    }
  };

  return isOpen
    ? createPortal(
        <ModalOverlay
          onClick={handleClickOverlay}
          onKeyDown={handlePressEscapeKey}
          style={overlayStyle}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            ref={contentRootRef}
            className="modal-content"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            style={contentRootStyle}
          >
            {children}
          </div>
        </ModalOverlay>,
        portalRef.current
      )
    : null;
};

export default Modal;
