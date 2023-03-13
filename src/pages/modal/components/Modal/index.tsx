import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
  ReactNode,
} from 'react';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './styles.scss';

interface ModalOverlayProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
  overlayStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

const createModalPortal = () => {
  const $modalPortal = document.createElement('div');
  $modalPortal.className = 'modal-portal';
  return $modalPortal;
};

const ModalOverlay: FC<ModalOverlayProps> = ({ children, ...rest }) => {
  return (
    <div className="modal-overlay" {...rest}>
      {children}
    </div>
  );
};

const Modal: FC<ModalProps> = ({
  children,
  isOpen = false,
  overlayStyle,
  contentStyle,
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

  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 focus 되어있던 엘리먼트를 기억한다.
    const prevFocusElement = document.activeElement as HTMLElement;
    contentRootRef.current?.focus();

    // 모달을 닫으면 포커스를 prevFocusElement로 이동시킨다.
    return () => {
      prevFocusElement?.focus?.();
    };
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <ModalOverlay style={overlayStyle}>
          <div
            ref={contentRootRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            style={contentStyle}
          >
            {children}
          </div>
        </ModalOverlay>,
        portalRef.current
      )
    : null;
};

export default Modal;
