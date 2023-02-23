import type { RefObject } from 'react';

import { useEffect } from 'react';

export default function useIntersectionObserver(
  ref: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    if (!ref.current) return;

    const $element = ref.current;
    const observer = new IntersectionObserver(callback, options);
    observer.observe($element);

    return () => observer.disconnect();
  }, [ref, callback]);
}
