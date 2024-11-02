import { Config } from "ziggy-js";
import { User } from "./user";

export type Method = "POST" | "PATCH" | "PUT" | "DELETE";

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};
