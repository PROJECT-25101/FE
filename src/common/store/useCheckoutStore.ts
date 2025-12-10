import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type { ISeat } from "../types/Seat";
import type { ISchedule } from "../types/Schedule";
import type { ICar } from "../types/Car";
import type { IRoute } from "../types/Route";

export interface ISeatState extends Omit<ISeat, "price"> {
  price: number;
}

interface AuthState {
  seat: ISeatState[];
  totalPrice: number;
  schedule: ISchedule | null;
  route: IRoute | null;
  car: ICar | null;
  pickupPoint: string | null;
  dropPoint: string | null;
  user: {
    email: string;
    phone: string;
    userName: string;
  } | null;
  setInformation: (payload: {
    seat?: ISeatState[];
    totalPrice?: number;
    schedule: ISchedule;
    route: IRoute;
    car: ICar;
    user: {
      email: string;
      phone: string;
      userName: string;
    };
    pickupPoint: string;
    dropPoint: string;
  }) => void;
  resetInformation: () => void;
}

export const useCheckoutStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        seat: [],
        totalPrice: 0,
        car: null,
        schedule: null,
        route: null,
        user: null,
        pointTrip: null,
        pickupPoint: null,
        dropPoint: null,
        setInformation: (payload) =>
          set((state) => ({
            seat: payload.seat ?? state.seat,
            totalPrice: payload.totalPrice ?? state.totalPrice,
            car: payload.car ?? state.car,
            schedule: payload.schedule ?? state.schedule,
            route: payload.route ?? state.route,
            user: payload.user ?? state.user,
            pickupPoint: payload.pickupPoint ?? state.pickupPoint,
            dropPoint: payload.dropPoint ?? state.dropPoint,
          })),
        resetInformation: () =>
          set({
            seat: [],
            totalPrice: 0,
            car: null,
            schedule: null,
            route: null,
            user: null,
            pickupPoint: null,
            dropPoint: null,
          }),
      }),
      { name: "Checkout" },
    ),
    { name: "Checkout" },
  ),
);

export const useCheckoutSelector = <T>(selector: (state: AuthState) => T): T =>
  useCheckoutStore(useShallow(selector));
