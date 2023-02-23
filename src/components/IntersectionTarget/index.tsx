import type { CSSProperties, FC } from 'react';

import React, { useCallback, useRef } from 'react';
import useIntersectionObserver from '~/hooks/useIntersectionObserver';

interface IntersectionTargetProps {
  className?: string;
  style?: CSSProperties;
  onIntersection?: () => void;
  offIntersection?: () => void;
}

const IntersectionTarget: FC<IntersectionTargetProps> = ({
  className,
  style,
  onIntersection,
  offIntersection,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) onIntersection?.();
      else offIntersection?.();
    },
    [onIntersection, offIntersection]
  );

  useIntersectionObserver(ref, callback);

  return <div ref={ref} style={style} className={className} />;
};

export default IntersectionTarget;
