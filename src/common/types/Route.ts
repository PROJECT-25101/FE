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

export interface IRoute {
  _id: string;
  name: string;
  description?: string;
  viaCities: ICity[];
  pickupPoint: IPoint;
  dropPoint: IPoint;
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
