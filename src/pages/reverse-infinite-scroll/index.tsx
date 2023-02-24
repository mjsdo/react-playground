import React, { useEffect, useRef } from 'react';
import IntersectionTarget from '~/components/IntersectionTarget';
import Chats from '~/pages/reverse-infinite-scroll/components/Chats';
import useInfiniteChats from '~/pages/reverse-infinite-scroll/hooks/useInfiniteChats';

import './styles.scss';

const ReverseInfiniteScrollPage = () => {
  const {
    data,
    isLoading,
    isInitialLoading,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteChats();
  const scrollContainerRef = useRef<HTMLElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const fetchOldChats = () => {
    if (hasPreviousPage && !isFetchingPreviousPage) {
      fetchPreviousPage().then(
        () => (scrollContainerRef.current!.scrollTop = 1)
      );
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView();
  }, [isInitialLoading]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="ris">
      <section className="ris__window" ref={scrollContainerRef}>
        <IntersectionTarget
          className="ris__chat-top"
          onIntersection={fetchOldChats}
        />
        <ul className="ris__chat-list">
          {data?.pages.map((page) => (
            <Chats key={page[0].id} chats={page} />
          ))}
        </ul>
        <div className="ris__chat-bottom" ref={chatBottomRef}></div>
      </section>
    </div>
  );
};

export default ReverseInfiniteScrollPage;
