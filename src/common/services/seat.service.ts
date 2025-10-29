import type { IParams } from "../types";
import type { IResponse } from "../types/Response";
import type { ISeatWithFloor } from "../types/Seat";
import api from "../utils/api";

export const getFloorByCar = async (
  carId: string,
  params?: IParams,
): Promise<IResponse<ISeatWithFloor[]>> => {
  const { data } = await api.get(`/seat/car/${carId}`, {
    params: { ...params, groupFloor: true },
  });
  return data;
};
