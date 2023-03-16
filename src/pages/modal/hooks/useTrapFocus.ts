// useTrapFocus
import type { RefObject } from 'react';

import { useEffect } from 'react';
import { createElement as el } from '~/utils/dom';
import { getFocusableElements } from '~/utils/focusable-selectors';

interface UseTrapFocusParams {
  isOpen: boolean;
  contentRootRef: RefObject<HTMLDivElement>;
}

const useTrapFocus = ({ isOpen, contentRootRef }: UseTrapFocusParams) => {
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
      $firstFocusable.focus();
    };

    const handleFocusTrapEnd = (e: globalThis.FocusEvent) => {
      e.preventDefault();
      $lastFocusable.focus();
    };

    const handleTabWithShift = (e: globalThis.KeyboardEvent) => {
      const withShift = e.shiftKey;
      const isTabKey = e.key === 'Tab';

      if (isTabKey && withShift) {
        e.preventDefault();
        $lastFocusable.focus();
      }
    };

    const handleTab = (e: globalThis.KeyboardEvent) => {
      const isTabKey = e.key === 'Tab';

      if (isTabKey) {
        e.preventDefault();
        $contentRoot.focus();
        $firstFocusable.focus();
      }
    };

    $firstFocusable.addEventListener('keydown', handleTabWithShift);
    $lastFocusable.addEventListener('keydown', handleTab);

    $modalTrapStart.addEventListener('focus', handleFocusTrapStart);
    $modalTrapEnd.addEventListener('focus', handleFocusTrapEnd);

    return () => {
      $modalTrapStart.remove();
      $modalTrapEnd.remove();
    };
  }, [isOpen, contentRootRef]);
};

export default useTrapFocus;
