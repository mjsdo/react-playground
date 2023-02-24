import type { FC } from 'react';
import type { Chat } from '~/pages/reverse-infinite-scroll/api/chats/types';

import React from 'react';

interface ChatsProps {
  chats: Chat[];
}

const Chats: FC<ChatsProps> = ({ chats }) => {
  return (
    <>
      {chats.map(({ id, message }) => (
        <li key={id} className="ris__chat-item">
          {message}
        </li>
      ))}
    </>
  );
};

export default Chats;
