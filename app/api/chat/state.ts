import { MessagesValue, StateSchema } from "@langchain/langgraph";

export const MessagesState = new StateSchema({
  messages: MessagesValue,
});
