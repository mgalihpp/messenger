import { Config } from "ziggy-js";
import { User } from "./user";
import { ChatPaginate } from "./chat";

export type Method = "POST" | "PATCH" | "PUT" | "DELETE";

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

export type ChatPageProps = PageProps<{ chats: ChatPaginate }>;
