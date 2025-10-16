import { useNavigate } from "react-router";
import FormInput from "../../../components/common/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgetPasswordSchema,
  type IForgetPasswordSchema,
} from "./forgetPassValidation";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../common/services/auth.service";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useToast } from "../../../common/hooks/useToast";

export default function ForgetpassPage() {
  const nav = useNavigate();
  const handlePrev = () => {
    nav(-1);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const { message: antdMessage, handleAxiosError } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: IForgetPasswordSchema) => resetPassword(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
  const onSubmit = (values: IForgetPasswordSchema) => {
    mutate(values);
  };
  return (
    <div className="flex items-center justify-end w-full ">
      <div className="rounded-md p-8 bg-white w-[70%] shadow-xl">
        <h2 className="text-cente font-medium text-2xl uppercase mb-4 text-green-700">
          Quên mật khẩu
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            {...register("email")}
            label="Xác thực email"
            placeholder="Điền địa chỉ email của bạn"
            type="text"
            required
            error={errors.email}
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
              "Xác nhận"
            )}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={handlePrev}
            className="text-green-600 cursor-pointer font-semibold hover:underline flex items-center justify-center"
          >
            Quay về
          </button>
        </form>
      </div>
    </div>
  );
}
