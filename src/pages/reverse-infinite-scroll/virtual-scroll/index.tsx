import type { VirtuosoHandle } from 'react-virtuoso';

import React, { useMemo, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import ChatItem from '~/pages/reverse-infinite-scroll/components/ChatItem';
import useAddChat from '~/pages/reverse-infinite-scroll/hooks/useAddChat';
import useInfiniteChats from '~/pages/reverse-infinite-scroll/hooks/useInfiniteChats';
import { add, concat } from '~/utils/predicate-utils';

import './styles.scss';

const VirtualScrollPage = () => {
  const {
    data,
    isError,
    isLoading,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteChats();
  const startIndex = 100000;
  const initialItemCount = 10;
  const [firstItemIndex, setFirstItemIndex] = useState(startIndex);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const addChat = useAddChat();

  const totalCount = useMemo(() => {
    return data?.pages.map((page) => page.length).reduce(add) || 0;
  }, [data]);

  const chats = useMemo(() => data?.pages.reduce(concat), [data]);

  const handleAddChat = () => {
    const id = crypto.randomUUID();
    const message = 'new chat';
    const $virtuoso = virtuosoRef.current;

    addChat({ id, message });

    setTimeout(() => {
      if ($virtuoso)
        $virtuoso.scrollToIndex({
          index: 'LAST',
        });
    });
  };

  const fetchOldChats = () => {
    if (hasPreviousPage && !isFetchingPreviousPage && !isLoading) {
      fetchPreviousPage().then(() => {
        setFirstItemIndex((prev) => prev - initialItemCount);
      });
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="ris-virtual">
      <section className="ris-virtual__window" ref={scrollContainerRef}>
        <Virtuoso
          ref={virtuosoRef}
          firstItemIndex={firstItemIndex}
          totalCount={totalCount}
          data={chats}
          startReached={fetchOldChats}
          initialTopMostItemIndex={initialItemCount - 1}
          itemContent={(index, chat) => <ChatItem key={chat.id} chat={chat} />}
        />
      </section>
      <button type="button" onClick={handleAddChat}>
        Add New Chat
      </button>
    </div>
  );
};

export default VirtualScrollPage;
