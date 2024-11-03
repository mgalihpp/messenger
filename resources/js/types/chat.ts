import { Paginate } from "./paginate";

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  message_id: string;
  from_id: string;
  body: string;
  is_read: boolean;
  is_reply: boolean;
  is_online: boolean;
  created_at: string;
  chat_type: CHAT_TYPE;
};

export enum CHAT_TYPE {
  CHATS = "chats",
  GROUPS_CHATS = "groups_chats",
}

export type ChatPaginate = Paginate<Chat[]>;
