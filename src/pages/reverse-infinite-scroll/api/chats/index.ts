import type { GetChats } from './types';

import { endpoints } from '~/endpoints';

export const getChats: GetChats = (cursor) => {
  const endpoint = `${endpoints.chats()}?cursor=${cursor}`;

  return fetch(endpoint).then((response) => response.json());
};
