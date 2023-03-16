import { useEffect } from 'react';

interface UsePreviousFocusOnCloseParams {
  isOpen: boolean;
}

const usePreviousFocus = ({ isOpen }: UsePreviousFocusOnCloseParams) => {
  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 focus 되어있던 엘리먼트를 기억한다.
    const prevFocusElement = document.activeElement as HTMLElement;

    // 모달을 닫으면 포커스를 prevFocusElement로 이동시킨다.
    return () => {
      prevFocusElement?.focus();
    };
  }, [isOpen]);
};

export default usePreviousFocus;
