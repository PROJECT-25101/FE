/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParams {
  [key: string]: any;
  page?: number | string;
  limit?: number | string;
  total?: number | string;
  totalPage?: number | string;
}
