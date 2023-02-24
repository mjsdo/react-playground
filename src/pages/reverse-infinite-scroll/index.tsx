import React, { useEffect, useRef } from 'react';
import IntersectionTarget from '~/components/IntersectionTarget';
import Chats from '~/pages/reverse-infinite-scroll/components/Chats';
import useInfiniteChats from '~/pages/reverse-infinite-scroll/hooks/useInfiniteChats';

import './styles.scss';

const ReverseInfiniteScrollPage = () => {
  const { data, isLoading, isInitialLoading } = useInfiniteChats();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView();
  }, [isInitialLoading]);

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="ris">
      <section className="ris__window">
        <IntersectionTarget
          className="ris__chat-top"
          onIntersection={() => console.log('onIntersection')}
          offIntersection={() => console.log('offIntersection')}
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
