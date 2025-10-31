import type { IParams } from "../types";
import type { IResponse } from "../types/Response";
import type { IProvince, IRoute } from "../types/Route";
import api from "../utils/api";

export const getAllProvince = async (): Promise<IResponse<IProvince[]>> => {
  const { data } = await api.get("/route/provinces");
  return data;
};

export const getAllRoute = async (
  params?: IParams,
): Promise<IResponse<IRoute[]>> => {
  const { data } = await api.get(`/route`, { params });
  return data;
};

export const getDetailRoute = async (
  id: string,
): Promise<IResponse<IRoute>> => {
  const { data } = await api.get(`/route/detail/${id}`);
  return data;
};

export const updateStatusRoute = async (
  id: string,
): Promise<IResponse<IRoute>> => {
  const { data } = await api.patch(`/route/status/${id}`);
  return data;
};
