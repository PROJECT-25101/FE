import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email đăng ký phải đúng định dạng email!" }),
  password: z
    .string({ message: "Mật khẩu không được để trống!" })
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự!")
    .max(20, "Mật khẩu chỉ được nhập tối đa 20 ký tự!"),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
