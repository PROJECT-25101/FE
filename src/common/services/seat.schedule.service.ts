import type { IResponse } from "../types/Response";
import type {
  IPayloadSeatSchedue,
  ISeatSchedule,
} from "../types/Seat.schedule";
import api from "../utils/api";

const prefix = `/seat-schedule`;
export const getSeatMapSchedule = async (
  carId: string,
  scheduleId: string,
): Promise<IResponse<ISeatSchedule[]>> => {
  const { data } = await api.get(`${prefix}/seat-map/${carId}/${scheduleId}`);
  return data;
};

export const toogleSeat = async (payload: IPayloadSeatSchedue) => {
  const { data } = await api.post(`${prefix}/toogle-seat`, payload);
  return data;
};
