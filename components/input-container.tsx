"use client";

import { ArrowUp, AudioLines, Plus } from "lucide-react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { useParams, useRouter } from "next/navigation";

import { DefaultChatTransport } from "ai";
import { SpeechInput } from "@/components/ai-elements/speech-input";
import { useChat } from "@ai-sdk/react";
import { useChatStore } from "@/store/chat-store";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function InputContainer() {
  const router = useRouter();
  const params = useParams();

  const finalThreadUrlId = params.thread_id;
  const [generatedId] = useState(() => uuidv4());

  const finalThreadId = finalThreadUrlId || generatedId;

  const [input, setInput] = useState("");

  const { chatInstance } = useChatStore();

  const { messages, sendMessage } = useChat({
    chat: chatInstance,
  });

  return (
    <div className="flex flex-col items-center mx-auto pb-6 w-full max-w-200">
      <PromptInput
        className="bg-[#2f2f2f] rounded-[32px] w-full"
        onSubmit={(message) => {
          if (!message.text) return;

          sendMessage(message, {
            body: {
              threadId: finalThreadId,
              // todo: selected model
            },
          });

          setInput("");

          // means we are on home page.
          if (!finalThreadUrlId) {
            router.push(`/chat/${finalThreadId}`);
          }
        }}
      >
        <PromptInputBody className="flex items-end w-full">
          <button
            type="button"
            className="flex justify-center items-center hover:bg-[#3f3f3f] mb-0.5 rounded-full w-10 h-10 text-[#b4b4b4] transition-colors shrink-0"
          >
            <Plus size={24} strokeWidth={1.5} />
          </button>

          <div className="flex-1 justify-center items-center w-full min-w-0 h-full">
            <PromptInputTextarea
              onChange={(e) => {
                console.log(e.target.value);
                setInput(e.target.value);
              }}
              value={input}
              placeholder="Ask anything"
              className="flex justify-center items-center bg-transparent py-3 border-none focus-visible:ring-0 focus:ring-0 w-full min-h-11 max-h-50 text-[18px] text-zinc-100 placeholder:text-[#676767] leading-tight resize-none"
            />
          </div>

          <div className="flex items-center gap-2 mb-0.5 shrink-0">
            <SpeechInput
              className="bg-transparent w-10 h-10 text-white shrink-0"
              onTranscriptionChange={(text) => {}}
              size="icon-lg"
              variant="ghost"
            />

            <button
              type="submit"
              className="flex justify-center items-center bg-white hover:bg-[#ececec] rounded-full w-10 h-10 text-black transition-all shrink-0"
            >
              <ArrowUp />
            </button>
          </div>
        </PromptInputBody>
      </PromptInput>
    </div>
  );
}

export default InputContainer;
