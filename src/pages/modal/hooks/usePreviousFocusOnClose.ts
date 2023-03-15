import type { RefObject} from 'react';

import { useEffect } from 'react';
import { getFocusableElement } from '~/utils/focusable-selectors';

interface UsePreviousFocusOnCloseParams {
  isOpen: boolean;
  contentRootRef: RefObject<HTMLDivElement>;
}

const usePreviousFocusOnClose = ({
  isOpen,
  contentRootRef,
}: UsePreviousFocusOnCloseParams) => {
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
  }, [isOpen, contentRootRef]);
};

export default usePreviousFocusOnClose;
