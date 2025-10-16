import z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email({ message: "Email nhập vào phải đúng định dạng!" }),
});
export type IForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
