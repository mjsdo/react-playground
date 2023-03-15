import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FC,
  ReactNode,
} from 'react';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createElement as el } from '~/utils/dom';
import { getFocusableElements } from '~/utils/focusable-selectors';

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

  // usePreviousFocusOnClose
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
      e.preventDefault();
      const withShift = e.shiftKey;
      const isTabKey = e.key === 'Tab';

      if (isTabKey && withShift) {
        $contentRoot.focus();
        $lastFocusable?.focus?.();
      }
    };

    const handleTabOnLastFocusable = (e: globalThis.KeyboardEvent) => {
      e.preventDefault();
      const isTabKey = e.key === 'Tab';

      if (isTabKey) {
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
