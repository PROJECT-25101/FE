import type { ILoginSchema } from "../../pages/auth/login/loginValidation";
import type { IRegisterSchema } from "../../pages/auth/register/registerValidation";
import type { IResponse } from "../types/Response";
import type { IUser } from "../types/User";
import api from "../utils/api";

export const registerApi = async (
  payload: Omit<IRegisterSchema, "confirmPassword">,
): Promise<IResponse<IUser>> => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const loginApi = async (
  payload: ILoginSchema,
): Promise<IResponse<{ user: IUser; accessToken: string }>> => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const loginGoole = async (): Promise<IResponse<string>> => {
  const { data } = await api.post("/auth/google/login");
  return data;
};

export const sendVerifyEmail = async (): Promise<IResponse<IUser>> => {
  const { data } = await api.post("/auth/send-verify");
  return data;
};

export const resetPassword = async (payload: {
  email: string;
}): Promise<IResponse<IUser>> => {
  const { data } = await api.post("/auth/reset-password", payload);
  return data;
};
