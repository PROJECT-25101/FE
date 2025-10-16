import type { IResponse } from "../types/Response";
import type { IUser } from "../types/User";
import api from "../utils/api";

export const getProfile = async (): Promise<IResponse<IUser>> => {
  const { data } = await api.get("/user/private");
  return data;
};
