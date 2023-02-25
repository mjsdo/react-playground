import type { Chat } from '~/pages/reverse-infinite-scroll/api/chats/types';

import { faker } from '@faker-js/faker';

/**
 *`cursor`부터 역방향으로 최대 `limit`개를 슬라이싱
 */
export const sliceChatsByCursor = (
  chats: Chat[],
  cursor: string,
  limit = 10
) => {
  const end = cursor === '-1' ? chats.length : Number(cursor) + 1;
  const tmp = end - limit;
  const start = tmp < 0 ? 0 : tmp;
  const prevCursor = start - 1 < 0 ? null : String(start - 1);

  return { chats: chats.slice(start, end), prevCursor: prevCursor } as const;
};

export const createChats = (size: number): Chat[] =>
  Array(size)
    .fill(undefined)
    .map((_, id) => ({ id: id + '', content: faker.lorem.paragraph(5) }));
