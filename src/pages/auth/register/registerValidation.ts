import z from "zod";

export const registerSchema = z
  .object({
    userName: z
      .string({ message: "Tên người dùng không được để trống!" })
      .min(3, "Tên người dùng phải có ít nhất 3 ký tự!")
      .max(20, "Tên người dùng chỉ được nhập tối đa 20 ký tự!"),
    email: z.email({ message: "Email đăng ký phải đúng định dạng email!" }),
    phone: z
      .string({ message: "Số điện thoại không được để trống!" })
      .min(6, "Phải có ít nhất 6 ký tự cho số điện thoại!")
      .max(14, "Số điện thoại chỉ được nhập tối đa 14 ký tự!"),
    password: z
      .string({ message: "Mật khẩu không được để trống!" })
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự!")
      .max(20, "Mật khẩu chỉ được nhập tối đa 20 ký tự!"),
    confirmPassword: z
      .string({ message: "Mật khẩu không được để trống!" })
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự!")
      .max(20, "Mật khẩu chỉ được nhập tối đa 20 ký tự!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp!",
    path: ["confirmPassword"],
  });

export type IRegisterSchema = z.infer<typeof registerSchema>;
