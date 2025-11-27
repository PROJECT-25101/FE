import type { ISeat, ISeatWithFloor } from "./Seat";

export interface ISeatSchedule extends Omit<ISeatWithFloor, "seats"> {
  seats: (ISeat & {
    bookingStatus: "available" | "hold" | "booked";
    userId: string | null;
  })[];
}

export interface IPayloadSeatSchedue {
  scheduleId: string;
  seatId: string;
}
