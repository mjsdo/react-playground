import type { InfiniteData } from '@tanstack/react-query';
import type { GetChatsResult } from '~/pages/reverse-infinite-scroll/api/chats/types';

import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import queryKeys from '~/react-query/queryKeys';

const useAddChat = () => {
  const queryKey = queryKeys.chats();
  const queryClient = useQueryClient();

  const addChat = ({ id, message }: { id: string; message: string }) => {
    queryClient.setQueryData<InfiniteData<GetChatsResult>>(queryKey, (data) => {
      return produce(data, (draft) => {
        const existsNewChatsPage = draft?.pageParams.find(
          (pageParam) => pageParam === 'new'
        );
        if (existsNewChatsPage) {
          draft?.pages.at(-1)?.chats.push({ id, message });
        } else {
          // refetch api를 사용한다면 page.prevCursor === 'new'인 page는 제외하기.
          draft?.pages.push({ chats: [{ id, message }], prevCursor: 'new' });
          draft?.pageParams.push('new');
        }
      });
    });
  };

  return addChat;
};

export default useAddChat;
