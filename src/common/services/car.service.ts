import type { IParams } from "../types";
import type { ICar, ICarPayload } from "../types/Car";
import type { IResponse } from "../types/Response";
import api from "../utils/api";

export const createCar = async (
  payload: ICarPayload,
): Promise<IResponse<ICar>> => {
  const { data } = await api.post("/car", payload);
  return data;
};

export const getAllCar = async (
  params?: IParams,
): Promise<IResponse<ICar[]>> => {
  const { data } = await api.get("/car", { params });
  return data;
};

export const getDetailCar = async (id: string): Promise<IResponse<ICar>> => {
  const { data } = await api.get(`/car/detail/${id}`);
  return data;
};

export const updateStatusCar = async (id: string): Promise<IResponse<ICar>> => {
  const { data } = await api.patch(`/car/status/${id}`);
  return data;
};
