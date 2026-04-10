import { DefaultChatTransport, UIMessage } from "ai";

import { Chat } from "@ai-sdk/react";
import { create } from "zustand";

export interface ChatStoreState {
  chatInstance: Chat<UIMessage>;
}

function createChat() {
  return new Chat<UIMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages, body }) => {
        const lastMessage = messages.slice(-1);

        let lastMessageText = "";

        const part = lastMessage[0]?.parts?.[0];
        if (part?.type === "text") {
          lastMessageText = part.text;
        }

        return {
          body: {
            messageContent: lastMessageText,
            threadId: body?.threadId,
          },
        };
      },
    }),
  });
}

export const useChatStore = create<ChatStoreState>((set) => ({
  chatInstance: createChat(),
}));
