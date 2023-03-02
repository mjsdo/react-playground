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
  const sliceEnd = cursor === '-1' ? chats.length : Number(cursor) + 1;
  const tmp = sliceEnd - limit;
  const sliceStart = tmp < 0 ? 0 : tmp;
  const prevCursor = sliceStart - 1 < 0 ? null : String(sliceStart - 1);

  return {
    chats: chats.slice(sliceStart, sliceEnd),
    prevCursor,
  } as const;
};

export const createChats = (size: number): Chat[] =>
  Array(size)
    .fill(undefined)
    .map((_, id) => ({ id: id + '', content: faker.lorem.paragraph(5) }));
