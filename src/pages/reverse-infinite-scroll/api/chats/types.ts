export type Chat = {
  id: string;
  message: string;
};

export type GetChatsQueryParams = { cursor: string };

export type GetChatsResult = {
  chats: Chat[];
  prevCursor: string | null;
};

export type GetChats = (cursor: string) => Promise<GetChatsResult>;
