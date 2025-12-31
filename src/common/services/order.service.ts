import type { IParams } from "../types";
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

export const getAllOrder = async (
  params?: IParams,
): Promise<IResponse<IOrder[]>> => {
  const { data } = await api.get(`${prefix}`, { params });
  return data;
};

export const getMyOrder = async (
  params?: IParams,
): Promise<IResponse<IOrder[]>> => {
  const { data } = await api.get(`${prefix}/my-order`, { params });
  return data;
};

export const getDetailOrder = async (
  id: string,
): Promise<IResponse<IOrder>> => {
  const { data } = await api.get(`${prefix}/detail/${id}`);
  return data;
};

export const verifyOrder = async (id: string) => {
  const { data } = await api.patch(`${prefix}/verfiry/${id}`);
  return data;
};

export const confirmOrder = async (id: string): Promise<IResponse<IOrder>> => {
  const { data } = await api.patch(`${prefix}/confirm/${id}`);
  return data;
};
