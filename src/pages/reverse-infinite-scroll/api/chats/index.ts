import type { GetChats } from './types';

export const getChats: GetChats = (cursor) => {
  const endpoint = `/infinite?cursor=${cursor}`;

  return fetch(endpoint).then((response) => response.json());
};
