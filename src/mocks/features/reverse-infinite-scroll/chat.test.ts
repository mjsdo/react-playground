import { sliceChatsByCursor, createChats } from './chat.data';

describe('sliceChatsByCursor', () => {
  it('min(슬라이싱하려는 개수, limit)개를 리턴한다.', () => {
    const mockChats = createChats(25);
    expect(sliceChatsByCursor(mockChats, '-1', 10).chats.length).toBe(10);
    expect(
      sliceChatsByCursor(mockChats, mockChats[5].id, 10).chats.length
    ).toBe(5 + 1);
  });
});
