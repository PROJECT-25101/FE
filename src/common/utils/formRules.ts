import type { Rule } from "antd/es/form";

export const requiredRule = (label: string, choose: boolean = false): Rule => ({
  required: true,
  message: `Vui lòng ${choose ? "chọn" : "nhập"} ${label.toLowerCase()}`,
});

export const minMaxRule = (
  label: string,
  {
    min,
    max,
    minLength,
    maxLength,
    type = "string",
  }: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    type?: "string" | "number";
  },
): Rule => {
  if (type === "number") {
    return {
      type: "number",
      min,
      max,
      message: `Giá trị ${label.toLowerCase()} phải từ ${min ?? "-∞"} đến ${max ?? "+∞"}`,
    };
  }

  return {
    min: minLength,
    max: maxLength,
    message: `${label} phải có độ dài từ ${minLength ?? 0} đến ${maxLength ?? "∞"} ký tự`,
  };
};

export const licensePlateRule = (label = "Biển số xe"): Rule => ({
  pattern: /^(?:[0-9]{2}[A-Z]{1,2}-[0-9]{3}\.?[0-9]{2})$/,
  message: `Vui lòng nhập ${label.toLowerCase()} hợp lệ (VD: 30A-12345)`,
});

export const formRules = {
  required: (label: string, choose?: boolean): Rule =>
    requiredRule(label, choose),

  textRange: (label: string, minLength: number, maxLength: number): Rule[] => [
    requiredRule(label),
    minMaxRule(label, { minLength, maxLength }),
  ],

  numberRange: (label: string, min: number, max: number): Rule[] => [
    requiredRule(label),
    minMaxRule(label, { min, max, type: "number" }),
  ],

  licensePlate: (label = "Biển số xe"): Rule[] => [
    requiredRule(label),
    licensePlateRule(label),
  ],
};
