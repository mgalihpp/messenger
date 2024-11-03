import { ChatState } from "@/context/ChatContext";
import { Chat, ChatPaginate } from "@/types/chat";

export type ChatAction =
  | {
      type: "SET_CHATS";
      payload: Chat[];
    }
  | {
      type: "SET_PAGINATE";
      payload: ChatPaginate;
    };

export const ChatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        chats: action.payload,
      };

    case "SET_PAGINATE":
      return {
        ...state,
        paginate: action.payload,
      };
  }
};
