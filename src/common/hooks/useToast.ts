/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from "antd";
import type { AxiosError } from "axios";

type HandleAxiosErrorOptions = {
  field?: string;
  type?: "error" | "info" | "warning" | "success";
  fallback?: string;
  silent?: boolean;
};
/**
 * Hook giúp hiển thị thông báo (toast) thân thiện và xử lý lỗi từ Axios.
 *
 * @returns Trả về 2 phần:
 * - `handleAxiosError`: Hàm xử lý lỗi Axios
 * - `message`: Đối tượng `AppMessageInstance` của Ant Design (giúp hiển thị toast)
 *
 * @example
 * const { message, handleAxiosError } = useToast();
 *
 * * Dùng message trực tiếp
 * message.success("Đăng ký thành công!");
 *
 * * Dùng handleAxiosError trong try/catch
 * try {
 *   await axios.get("/api");
 * } catch (error) {
 *   handleAxiosError(error, { field: "errorMessage", type: "warning" });
 * }
 */
export const useToast = () => {
  /**
   * `message` là instance từ `App.useApp()` của Ant Design.
   * Cung cấp các phương thức tiện lợi để hiển thị toast:
   * - `message.success(content, duration?)`
   * - `message.error(content, duration?)`
   * - `message.info(content, duration?)`
   * - `message.warning(content, duration?)`
   * - `message.open({ type, content, duration })`
   */
  const { message } = App.useApp();
  /**
   * Xử lý lỗi trả về từ Axios và hiển thị thông báo thân thiện cho người dùng.
   *
   * @param error - Đối tượng lỗi (thường lấy từ `catch` khi gọi Axios)
   * @param options - Tùy chọn hiển thị thông báo
   * @param options.field - Tên field trong `response.data` chứa message (mặc định: `"message"`)
   * @param options.type - Kiểu thông báo (`"error" | "info" | "warning" | "success"`, mặc định `"error"`)
   * @param options.fallback - Chuỗi fallback nếu không có message từ server (mặc định `"Đã có lỗi xảy ra!"`)
   * @param options.silent - Nếu `true` thì không hiển thị message, chỉ trả về chuỗi message
   *
   * @returns Chuỗi message được trích ra (đã hiển thị nếu `silent = false`)
   *
   * @example
   * try {
   *   await axios.get("/api");
   * } catch (error) {
   *   handleAxiosError(error, { field: "errorMessage", type: "warning" });
   * }
   */
  const handleAxiosError = (
    error: unknown,
    options?: HandleAxiosErrorOptions,
  ): string => {
    const {
      field = "message",
      type = "error",
      fallback = "Đã có lỗi xảy ra!",
      silent = false,
    } = options || {};

    const err = error as AxiosError<any>;
    const msg =
      (err?.response?.data && (err.response.data[field] as string)) ||
      err?.message ||
      fallback;

    if (!silent) message[type](msg);

    return msg;
  };

  return { handleAxiosError, message };
};
