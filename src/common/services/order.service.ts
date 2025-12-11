import type { IOrder } from "../types/Order";
import type { IResponse } from "../types/Response";
import api from "../utils/api";

const prefix = `/order`;
export const createOrderPayos = async (
  payload: any,
): Promise<IResponse<{ order: IOrder; checkoutUrl: string }>> => {
  const { data } = await api.post(`${prefix}/create-payos`, payload);
  return data;
};
