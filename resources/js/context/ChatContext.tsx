import { ChatReducer } from "@/reducer/ChatReducer";
import { ChatPageProps } from "@/types";
import { Chat, ChatPaginate } from "@/types/chat";
import { InitialPaginate } from "@/types/paginate";
import { usePage } from "@inertiajs/react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export type ChatState = {
  chats: Chat[];
  paginate: ChatPaginate;
  setChats: (chat: Chat[]) => void;
  setPaginate: (chat: ChatPaginate) => void;
  refetchChats: () => void;
};

const ChatInitialState: ChatState = {
  chats: [],
  paginate: InitialPaginate,
  setChats: () => {},
  setPaginate: () => {},
  refetchChats: () => {},
};

const ChatContext = createContext<ChatState>(ChatInitialState);

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within ChatContext");
  }

  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const props = usePage<ChatPageProps>().props;

  const [state, dispacth] = useReducer(ChatReducer, ChatInitialState);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const setChats = (chats: Chat[]) =>
    dispacth({
      type: "SET_CHATS",
      payload: chats,
    });

  const setPaginate = (paginate: ChatPaginate) =>
    dispacth({
      type: "SET_PAGINATE",
      payload: paginate,
    });

  const refetchChats = () => {};

  useEffect(() => {
    setIsFirstLoad(false);
    setChats(props.chats.data);
    setPaginate(props.chats);
  }, []);

  const values = {
    ...state,
    chats: isFirstLoad ? props.chats.data : state.chats,
    paginate: isFirstLoad ? props.chats : state.paginate,
    setChats,
    setPaginate,
    refetchChats,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};
