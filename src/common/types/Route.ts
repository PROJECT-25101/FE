export interface ICity {
  _id: string;
  label: string;
  description?: string;
}

export interface IPoint {
  _id: string;
  label: string;
  description: string;
}

export interface IDistrict extends Omit<IPoint, "description"> {
  description: string[];
}

export interface IPointWithDistrict extends IPoint {
  district: IDistrict[];
}

export interface IPointSelect extends Partial<IPoint> {
  value: string;
}

export interface IRoute {
  _id: string;
  name: string;
  description?: string;
  pickupPoint: IPointWithDistrict;
  dropPoint: IPointWithDistrict;
  routePrice: number;
  distance: string;
  duration: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProvince {
  _id: string;
  label: string;
}
