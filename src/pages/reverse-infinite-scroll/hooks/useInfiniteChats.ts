import { useInfiniteQuery } from '@tanstack/react-query';
import { getChats } from '~/pages/reverse-infinite-scroll/api/chats';
const useInfiniteChats = () => {
  const queryKey = ['infinite'];
  const initialPageParam = '-1';
  return useInfiniteQuery(
    queryKey,
    ({ pageParam = initialPageParam }) => getChats(pageParam),
    {
      getPreviousPageParam: (lastPage) => {
        return lastPage.prevCursor || undefined;
      },
      select: (data) => {
        return {
          ...data,
          pages: data.pages.map(({ chats }) => chats),
        };
      },
    }
  );
};

export default useInfiniteChats;
