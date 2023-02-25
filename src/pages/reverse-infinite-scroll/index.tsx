import React, { useEffect, useRef } from 'react';
import IntersectionTarget from '~/components/IntersectionTarget';
import Chats from '~/pages/reverse-infinite-scroll/components/Chats';
import useAddChat from '~/pages/reverse-infinite-scroll/hooks/useAddChat';
import useInfiniteChats from '~/pages/reverse-infinite-scroll/hooks/useInfiniteChats';

import './styles.scss';

const ReverseInfiniteScrollPage = () => {
  const {
    data,
    isError,
    isLoading,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteChats();
  const scrollContainerRef = useRef<HTMLElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const addChat = useAddChat();
  const handleAddChat = () => {
    const id = crypto.randomUUID();
    const content = 'new chat';
    const $chatBottom = chatBottomRef.current;

    addChat({ id, content });
    setTimeout(() => {
      $chatBottom?.scrollIntoView();
    });
  };

  const fetchOldChats = () => {
    if (hasPreviousPage && !isFetchingPreviousPage && !isLoading) {
      fetchPreviousPage().then(
        () => (scrollContainerRef.current!.scrollTop = 1)
      );
    }
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView();
  }, [isLoading]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="ris">
      <section className="ris__window" ref={scrollContainerRef}>
        <IntersectionTarget
          className="ris__chat-top"
          onIntersection={fetchOldChats}
        />
        <ul className="ris__chat-list">
          {data.pages.map((page) => (
            <Chats key={page.at(0)?.id} chats={page} />
          ))}
        </ul>
        <div className="ris__chat-bottom" ref={chatBottomRef}></div>
      </section>
      <button type="button" onClick={handleAddChat}>
        Add New Chat
      </button>
    </div>
  );
};

export default ReverseInfiniteScrollPage;
