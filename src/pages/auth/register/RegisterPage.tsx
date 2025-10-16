import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useToast } from "../../../common/hooks/useToast";
import { registerApi } from "../../../common/services/auth.service";
import FormInput from "../../../components/common/FormInput";
import { registerSchema, type IRegisterSchema } from "./registerValidation";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { handleAxiosError, message: antdMessage } = useToast();
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Omit<IRegisterSchema, "confirmPassword">) =>
      registerApi(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      nav("/auth/login");
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
  const onSubmit = (values: IRegisterSchema) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;
    mutate(payload);
  };
  return (
    <div className="flex items-center justify-end w-full ">
      <div className="rounded-md p-8 bg-white w-[70%] shadow-xl">
        <h2 className="text-cente font-medium text-2xl uppercase mb-4 text-green-700">
          Đăng ký
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            label="Họ và tên"
            placeholder="Họ và tên"
            type="text"
            {...register("userName")}
            error={errors.userName}
            required
          />
          <FormInput
            label="Địa chỉ email"
            placeholder="Email"
            type="email"
            {...register("email")}
            error={errors.email}
            required
          />
          <FormInput
            label="Số điện thoại"
            placeholder="Số điện thoại"
            type="text"
            {...register("phone")}
            error={errors.phone}
            required
          />

          <FormInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            {...register("password")}
            error={errors.password}
            required
          />
          <FormInput
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu của bạn"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            required
          />
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
              "Đăng ký"
            )}
          </button>
        </form>
        <div>
          <p className="text-gray-500 my-4 text-center">Hoặc</p>
          <button className="hover:border-green-600 hover:text-green-600 flex items-center justify-center gap-3 border w-full py-2 rounded-md cursor-pointer">
            <img
              src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
              className="w-6"
              alt=""
            />
            Đăng nhập với Google
          </button>
        </div>

        <div className="text-center mt-4 text-sm">
          <p>
            <span className="font-semibold">Bạn đã có tài khoản?</span>{" "}
            <Link
              to="/auth/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Đăng nhập
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
