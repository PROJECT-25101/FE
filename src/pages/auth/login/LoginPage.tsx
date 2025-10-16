import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Spin } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../../common/hooks/useToast";
import { loginApi, loginGoole } from "../../../common/services/auth.service";
import { useAuthStore } from "../../../common/store";
import FormInput from "../../../components/common/FormInput";
import { loginSchema, type ILoginSchema } from "./loginValidation";

export default function LoginPage() {
  const error_active = `Tài khoản của bạn chưa được xác thực!`;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState(null);
  const { message: antdMessage } = useToast();
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ILoginSchema) => loginApi(payload),
    onSuccess: ({ data, message }) => {
      const login = useAuthStore.getState().login;
      antdMessage.success(message);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.accessToken, null);
      setError(null);
      nav("/");
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      setError(err.response.data.message);
    },
  });
  const onSubmit = (values: ILoginSchema) => {
    mutate(values);
  };
  const { mutate: mutateGoogle, isPending: isPendingGoogle } = useMutation({
    mutationFn: () => loginGoole(),
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
  });
  return (
    <div className="flex items-center justify-end w-full ">
      <div className="rounded-md p-8 bg-white w-[70%] shadow-xl">
        <h2 className="text-cente font-medium text-2xl uppercase mb-4 text-green-700">
          Đăng nhập
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            {...register("email")}
            required
            placeholder="Nhập địa chỉ Email"
            label="Địa chỉ email"
            type="text"
            error={errors.email}
          />
          <FormInput
            {...register("password")}
            required
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            error={errors.password}
          />
          {error && (
            <div
              className={`bg-red-100 h-10 relative flex items-center px-2 rounded-md border border-red-400`}
            >
              <p className="text-red-500 text-sm">{error}</p>
              {error === error_active && (
                <button
                  type="button"
                  className="ml-1 cursor-pointer hover:opacity-85 text-green-700"
                >
                  Gửi lại mã
                </button>
              )}
              <button
                type="button"
                onClick={() => setError(null)}
                className="absolute cursor-pointer hover:opacity-85 top-1 text-red-500 text-xs right-2"
              >
                <CloseOutlined />
              </button>
            </div>
          )}
          <button
            disabled={isPending}
            type="submit"
            className="bg-green-600 text-white font-semibold py-2 cursor-pointer rounded hover:bg-green-700 transition"
          >
            {isPending ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
              />
            ) : (
              "Đăng Nhập"
            )}
          </button>
        </form>
        <div>
          <p className="text-gray-500 my-4 text-center">Hoặc</p>
          <button
            onClick={() => mutateGoogle()}
            className="hover:border-green-600 hover:text-green-600 flex items-center justify-center gap-3 border w-full py-2 rounded-md cursor-pointer"
          >
            {isPendingGoogle ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
              />
            ) : (
              <>
                <img
                  src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                  className="w-6"
                  alt=""
                />
                Đăng nhập với Google
              </>
            )}
          </button>
        </div>

        <div className="text-center mt-4 text-sm">
          <p>
            <span className="font-semibold">Bạn chưa có tài khoản?</span>{" "}
            <Link
              to="/auth/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Đăng ký
            </Link>
          </p>
          <Link
            to="/auth/forgetpass"
            className="text-green-600 hover:underline mt-2 inline-block"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
}
