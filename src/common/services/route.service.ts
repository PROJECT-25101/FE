import type { IParams } from "../types";
import type { IResponse } from "../types/Response";
import type { IPoint, IProvince, IRoute } from "../types/Route";
import api from "../utils/api";

export const getAllProvince = async (): Promise<IResponse<IProvince[]>> => {
  const { data } = await api.get("/route/provinces");
  return data;
};

export const getPointRoute = async (
  params?: IParams,
): Promise<IResponse<IPoint[]>> => {
  const { data } = await api.get("/route/point-trip", { params });
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

export const createRoute = async (
  payload: Partial<IRoute>,
): Promise<IResponse<IRoute>> => {
  const { data } = await api.post("/route", payload);
  return data;
};

export const updateRoute = async (
  id: string,
  payload: Partial<IRoute>,
): Promise<IResponse<IRoute>> => {
  const { data } = await api.patch(`/route/update/${id}`, payload);
  return data;
};
