import type { IParams } from "../types";
import type { IResponse } from "../types/Response";
import type {
  IPayloadFloor,
  IPayloadSeat,
  ISeat,
  ISeatWithFloor,
} from "../types/Seat";
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

export const createFloor = async (
  carId: string,
  payload: IPayloadFloor,
): Promise<IResponse<ISeat[]>> => {
  const { data } = await api.post("/seat/floor/create", { ...payload, carId });
  return data;
};

export const deleteFloor = async (seatIds: string[], carId: string) => {
  const { data } = await api.patch("/seat/floor/delete", {
    seatIds: seatIds,
    carId,
  });
  return data;
};

export const updateStatusFloor = async (
  seatIds: string[],
  carId: string,
  status: boolean,
) => {
  const { data } = await api.patch("/seat/floor/status", {
    seatIds: seatIds,
    carId,
    status,
  });
  return data;
};

export const createSeat = async (
  payload: IPayloadSeat,
): Promise<IResponse<ISeat>> => {
  const { data } = await api.post("/seat/create", payload);
  return data;
};

export const deleteSeat = async (seatId: string) => {
  const { data } = await api.delete(`/seat/delete/${seatId}`);
  return data;
};

export const updateStatusSeat = async (
  seatId: string,
): Promise<IResponse<ISeat>> => {
  const { data } = await api.patch(`/seat/status/${seatId}`);
  return data;
};
