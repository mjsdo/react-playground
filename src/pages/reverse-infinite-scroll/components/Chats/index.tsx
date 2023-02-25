import type { FC } from 'react';
import type { Chat } from '~/pages/reverse-infinite-scroll/api/chats/types';

import React, { memo } from 'react';

interface ChatsProps {
  chats: Chat[];
}

const Chats: FC<ChatsProps> = ({ chats }) => {
  return (
    <>
      {chats.map(({ id, content }) => (
        <li key={id} className="ris__chat-item">
          {id} <br /> {content}
        </li>
      ))}
    </>
  );
};

export default memo(Chats);
