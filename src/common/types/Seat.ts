export interface ISeat {
  _id: string;
  carId: {
    _id: string;
    name: string;
    licensePlate: string;
  };
  seatOrder: number;
  seatLabel: string;
  floor: number;
  col: number;
  row: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPayloadSeat extends Omit<ISeat, "_id" | "status" | "carId"> {
  carId: string;
}

export interface ISeatWithFloor {
  floor: number;
  cols: number;
  rows: number;
  seats: ISeat[];
}

export interface IPayloadFloor {
  floorNumber: number;
  floors: [{ seatCount: number; col: number }];
}
