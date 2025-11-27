import { useNavigate } from "react-router";
import { useAuthSelector } from "../store";
import { useToast } from "./useToast";

export const useAuthNavigate = () => {
  const nav = useNavigate();
  const { message } = useToast();
  const isLogged = useAuthSelector((state) => state.isLogged);
  const navigateAuth = () => {
    message.info("Bạn cần phải đăng nhập trước!");
    nav("/auth/login");
    return;
  };
  return isLogged ? nav : navigateAuth;
};
