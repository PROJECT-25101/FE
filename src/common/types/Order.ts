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
