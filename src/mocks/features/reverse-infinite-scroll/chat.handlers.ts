import type {
  GetChatsQueryParams,
  GetChatsResult,
} from '~/pages/reverse-infinite-scroll/api/chats/types';

import { rest } from 'msw';
import { endpoints } from '~/endpoints';
import {
  createChats,
  sliceChatsByCursor,
} from '~/mocks/features/reverse-infinite-scroll/chat.data';

const mockChats = createChats(10000);

const getChats = rest.get<never, GetChatsQueryParams, GetChatsResult>(
  endpoints.chats(),
  (req, res, ctx) => {
    const cursor = req.url.searchParams.get('cursor')!;

    const { chats, prevCursor } = sliceChatsByCursor(mockChats, cursor);

    return res(
      ctx.status(200),
      ctx.json({
        chats,
        prevCursor,
      })
    );
  }
);

export default [getChats];
