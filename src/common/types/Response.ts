export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface IResponse<T> {
  data: T;
  message: string;
  meta: IMeta | null;
  success: boolean;
}
