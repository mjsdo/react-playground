import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createElement as el } from '~/utils/dom';
import {
  getFocusableElement,
  getFocusableElements,
} from '~/utils/focusable-selectors';

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

  const handleClickOverlay = () => {
    if (shouldCloseOnOverlayClick) onRequestClose?.();
  };

  const handlePressEscapeKey: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      onRequestClose?.();
    }
  };

  useEffect(() => {
    const $portal = portalRef.current;
    document.body.append($portal);

    return () => {
      document.body.removeChild($portal);
    };
  }, []);

  // usePreviousFocusOnClose
  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 focus 되어있던 엘리먼트를 기억한다.
    const prevFocusElement = document.activeElement as HTMLElement;
    const $contentRoot = contentRootRef.current;
    if ($contentRoot) getFocusableElement($contentRoot)?.focus();

    // 모달을 닫으면 포커스를 prevFocusElement로 이동시킨다.
    return () => {
      prevFocusElement?.focus?.();
    };
  }, [isOpen]);

  // useTrapFocus
  useEffect(() => {
    if (!isOpen) return;
    const $contentRoot = contentRootRef.current;
    if (!$contentRoot) return;

    const $$focusable = getFocusableElements($contentRoot);
    const $firstFocusable = $$focusable.at(0) || $contentRoot;
    const $lastFocusable = $$focusable.at(-1) || $contentRoot;

    // 앞뒤로 요소를 추가한다.
    const $modalTrapStart = el('div', { class: 'trap-start', tabindex: '0' });
    const $modalTrapEnd = el('div', { class: 'trap-end', tabindex: '0' });
    document.body.insertAdjacentElement('afterbegin', $modalTrapStart);
    document.body.insertAdjacentElement('beforeend', $modalTrapEnd);

    const handleFocusTrapStart = (e: globalThis.FocusEvent) => {
      e.preventDefault();
      $firstFocusable?.focus();
    };

    const handleFocusTrapEnd = (e: globalThis.FocusEvent) => {
      e.preventDefault();
      $lastFocusable?.focus();
    };

    const handleTabWithShiftOnFirstFocusable = (
      e: globalThis.KeyboardEvent
    ) => {
      const withShift = e.shiftKey;
      const isTabKey = e.key === 'Tab';

      if (isTabKey && withShift) {
        e.preventDefault();
        $lastFocusable?.focus?.();
      }
    };

    const handleTabOnLastFocusable = (e: globalThis.KeyboardEvent) => {
      const isTabKey = e.key === 'Tab';

      if (isTabKey) {
        e.preventDefault();
        $contentRoot.focus();
        $firstFocusable?.focus?.();
      }
    };

    $firstFocusable?.addEventListener(
      'keydown',
      handleTabWithShiftOnFirstFocusable
    );
    $lastFocusable?.addEventListener('keydown', handleTabOnLastFocusable);

    $modalTrapStart.addEventListener('focus', handleFocusTrapStart);
    $modalTrapEnd.addEventListener('focus', handleFocusTrapEnd);

    return () => {
      $modalTrapStart.remove();
      $modalTrapEnd.remove();
    };
  }, [isOpen]);

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
