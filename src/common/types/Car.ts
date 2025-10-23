export interface ICarModel {
  brand: string;
  model: string;
  engine: string;
}

export interface ICar {
  _id: string;
  name: string;
  licensePlate: string;
  model: ICarModel;
  maxSeatCapacity: number;
  type: "VIP" | "NORMAL";
  status: boolean;
  totalFloor: number;
  createdAt?: string;
  updatedAt?: string;
}
