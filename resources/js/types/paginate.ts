import { Chat } from "./chat";

export type Paginate<T> = {
  data: T;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
};

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export const InitialPaginate: Paginate<Chat[]> = {
  data: [],
  current_page: 0,
  first_page_url: "",
  from: 0,
  last_page: 0,
  last_page_url: "",
  links: [],
  next_page_url: "",
  path: "",
  per_page: 0,
  prev_page_url: "",
  to: 0,
  total: 0,
};
