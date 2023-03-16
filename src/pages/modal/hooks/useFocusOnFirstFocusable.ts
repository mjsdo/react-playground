import type { RefObject} from 'react';

import { useEffect } from 'react';
import { getFocusableElement } from '~/utils/focusable-selectors';

interface UseFocusOnFirstFocusableParams {
  isOpen: boolean;
  contentRootRef: RefObject<HTMLDivElement>;
}

const useFocusOnFirstFocusable = ({
  isOpen,
  contentRootRef,
}: UseFocusOnFirstFocusableParams) => {
  useEffect(() => {
    if (!isOpen) return;

    const $contentRoot = contentRootRef.current;
    if ($contentRoot) getFocusableElement($contentRoot)?.focus();
  }, [isOpen, contentRootRef]);
};

export default useFocusOnFirstFocusable;
