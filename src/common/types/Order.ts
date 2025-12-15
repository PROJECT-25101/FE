export interface ISeat {
  seatOrder: number;
  seatLabel: string;
}

export interface ICustomerInfo {
  email: string;
  userName: string;
  phone: string;
}

export interface ICarInfo {
  licensePlate: string;
  type: "VIP" | "NORMAL";
  brand: string;
  model: string;
}

export interface IOrder {
  _id: string;
  paymentOrderCode?: string;
  paymentCheckoutUrl?: string;
  carId: string;
  routeId: string;
  userId: string;
  scheduleId: string;
  seats: ISeat[];
  customerInfo: ICustomerInfo;
  carInfo: ICarInfo;
  pickupPoint: string;
  startTime: string;
  dropPoint: string;
  arrivalTime: string;
  totalPrice: number;
  isPaid: boolean;
  status: "BUYED" | "USED" | "CANCELLED";
  cancelDescription?: string;
  note?: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISeat {
  seatId: string;
  seatOrder: number;
  seatLabel: string;
}

export interface ICustomerInfo {
  email: string;
  userName: string;
  phone: string;
}

export type CarType = "VIP" | "NORMAL";

export interface ICarInfo {
  licensePlate: string;
  type: CarType;
  brand: string;
  model: string;
}

export type OrderStatus = "BUYED" | "USED" | "CANCELLED";

export interface IOrder {
  _id: string;

  paymentOrderCode?: string;
  paymentCheckoutUrl?: string;

  carId: string;
  routeId: string;
  userId: string;
  scheduleId: string;

  seats: ISeat[];

  customerInfo: ICustomerInfo;
  carInfo: ICarInfo;

  pickupPoint: string;
  startTime: string;
  dropPoint: string;
  arrivalTime: string;

  totalPrice: number;

  isPaid: boolean;
  status: OrderStatus;

  cancelDescription?: string;
  note?: string;

  expiredDate: string;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrderPayload {
  carId: string;
  routeId: string;
  scheduleId: string;

  seats: ISeat[];

  customerInfo: ICustomerInfo;
  carInfo: ICarInfo;

  pickupPoint: string;
  startTime: string;
  dropPoint: string;
  arrivalTime: string;

  totalPrice: number;
  note?: string;
}

export interface IUpdateOrderStatusPayload {
  status: OrderStatus;
  cancelDescription?: string;
}

export interface IOrderPopulated
  extends Omit<IOrder, "carId" | "routeId" | "userId" | "scheduleId"> {
  carId: {
    _id: string;
    licensePlate: string;
    type: CarType;
  };
  routeId: {
    _id: string;
    name: string;
  };
  userId: {
    _id: string;
    email: string;
    userName: string;
  };
  scheduleId: {
    _id: string;
    startTime: string;
    arrivalTime: string;
  };
}
