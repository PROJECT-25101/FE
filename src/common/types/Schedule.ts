import type { ICar } from "./Car";
import type { IRoute } from "./Route";
import type { IUser } from "./User";

export interface ICrew {
  userId: IUser | string;
  role: "driver" | "assistant";
}
export type TStatusSchedule =
  | "pending"
  | "confirmed"
  | "running"
  | "completed"
  | "cancelled";

export interface ISchedule {
  _id: string;
  carId: ICar;
  routeId: IRoute;
  startTime: string;
  arrivalTime?: string;
  crew: ICrew[];
  dayOfWeek: number;
  price?: number;
  status: TStatusSchedule;
  isDisable: boolean;
  disableBy: "service" | "handle";
  createdAt: string;
  updatedAt: string;
}

export interface IScheduleCarIdRouteId extends Omit<ISchedule, "dayOfWeek"> {
  count: number;
  inActiveCount: number;
  activeCount: number;
  dayOfWeek: number[];
}

export interface ICreateManySchedulePayload {
  carId: string;
  routeId: string;
  startTime: string;
  untilTime: string;
  crew: (Omit<ICrew, "userId"> & { userId: string })[];
  dayOfWeek: number[];
  fixedTime?: {
    hour: number;
    minute: number;
    second?: number;
  };
}
