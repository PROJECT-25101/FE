import type { IParams } from "../types";
import type { IResponse } from "../types/Response";
import type {
  ICreateManySchedulePayload,
  ISchedule,
  IScheduleCarIdRouteId,
} from "../types/Schedule";
import api from "../utils/api";

export const getAllSchedules = async (
  params?: IParams,
): Promise<IResponse<ISchedule[]>> => {
  const { data } = await api.get(`/schedule`, {
    params: { ...params, isDisable: false },
  });
  return data;
};

export const getAllScheduleCarRoute = async (
  params: IParams,
): Promise<IResponse<IScheduleCarIdRouteId[]>> => {
  const { data } = await api.get(`/schedule`, {
    params: { ...params, groupSchedule: true },
  });
  return data;
};

export const getAllScheduleByCarIdRouteId = async (
  carId: string,
  routeId: string,
  params?: IParams,
): Promise<IResponse<ISchedule[]>> => {
  const { data } = await api.get(
    `/schedule?carId=${carId}&routeId=${routeId}`,
    { params },
  );
  return data;
};

export const createManySchedule = async (
  payload: ICreateManySchedulePayload,
): Promise<
  IResponse<{ createdSchedules: ISchedule[]; failedSchedules: ISchedule[] }>
> => {
  const { data } = await api.post("/schedule/many", payload);
  return data;
};

export const insertManyContinue = async (payload: ISchedule[]) => {
  const { data } = await api.post("/schedule/many-continue", payload);
  return data;
};

export const updateDisableSchedule = async (id: string) => {
  const { data } = await api.patch(`/schedule/update-disable/${id}`);
  return data;
};
