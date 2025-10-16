export interface IResponse<T> {
  data: T;
  message: string;
  meta: null;
  success: boolean;
}
