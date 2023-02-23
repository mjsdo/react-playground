import React, { Fragment, useEffect, useRef } from 'react';
import useInfiniteChats from '~/pages/reverse-infinite-scroll/hooks/useInfiniteChats';

import './styles.scss';

const ReverseInfiniteScrollPage = () => {
  const { data, isLoading, isInitialLoading } = useInfiniteChats();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [isInitialLoading]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="ris">
      <section className="ris__window">
        <div className="ris__intersection-target"></div>
        <ul className="ris__chat-list">
          {data?.pages.map((page) => {
            const pageKey = page[0].id;

            return (
              <Fragment key={pageKey}>
                {page.map(({ id, message }) => (
                  <li key={id} className="ris__chat-item">
                    {message}
                  </li>
                ))}
              </Fragment>
            );
          })}
        </ul>
        <div className="ris__chat-end" ref={ref}></div>
      </section>
    </div>
  );
};

export default ReverseInfiniteScrollPage;
