import type { IParams } from "../types";
import type { ICar } from "../types/Car";
import type { IResponse } from "../types/Response";
import api from "../utils/api";

export const getAllCar = async (
  params?: IParams,
): Promise<IResponse<ICar[]>> => {
  const { data } = await api.get("/car", { params });
  return data;
};

export const updateStatusCar = async (id: string): Promise<IResponse<ICar>> => {
  const { data } = await api.patch(`/car/status/${id}`);
  return data;
};
