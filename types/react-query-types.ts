import { MessageType } from "./db-derivated-types";

export type PageQuery = {
  count: number;
  data: MessageType[];
};
export type QueryData = {
  pageParams: number[];
  pages: PageQuery[];
};
