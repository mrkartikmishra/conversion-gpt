"use client";

import InputContainer from "./input-container";
import MessageRenderer from "./message-renderer";
import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/store/chat-store";

export const ChatInterfaceNew = () => {
  const { chatInstance } = useChatStore();

  const { messages } = useChat({ chat: chatInstance });

  return (
    <>
      {messages.length === 0 ? (
        <div className="flex flex-col flex-1 w-full h-full min-h-0 overflow-y-scroll">
          <main className="flex flex-col justify-end md:justify-center items-center mx-auto -mt-20 px-4 w-full max-w-4xl h-full">
            <h1 className="mb-8 font-normal text-white text-3xl tracking-tight">
              What can I help with ?
            </h1>
            <InputContainer />
          </main>
        </div>
      ) : (
        <div className="flex flex-col flex-1 w-full h-full min-h-0 overflow-hidden">
          <div className="flex flex-col w-full h-full">
            <div className="flex-1 min-h-0">
              <MessageRenderer messages={messages} />
            </div>

            <div>
              <InputContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
