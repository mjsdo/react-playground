import type { FC } from 'react';
import type { Chat } from '~/pages/reverse-infinite-scroll/api/chats/types';

import React, { memo } from 'react';

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: FC<ChatItemProps> = ({ chat: { id, content } }) => {
  return (
    <li key={id} className="ris-virtual__chat-item">
      {id} <br /> {content}
    </li>
  );
};

export default memo(ChatItem);
