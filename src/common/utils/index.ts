import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatCurrency = (price: number | string): string => {
  if (price == null || price === "") return "0 ₫";
  const number = Number(price);
  if (isNaN(number)) return "0 ₫";
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

type Primitive = string | number | boolean | null | undefined;
type Cleanable = Record<string, unknown> | Primitive | Cleanable[];

export function deepCleanup<T extends Cleanable>(obj: T): T | undefined {
  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map((v) => deepCleanup(v))
      .filter(
        (v) =>
          v !== undefined &&
          v !== null &&
          (typeof v !== "object" ||
            (Array.isArray(v) ? v.length > 0 : Object.keys(v).length > 0)),
      );
    return (cleanedArray.length > 0 ? cleanedArray : undefined) as
      | T
      | undefined;
  }

  if (typeof obj === "object" && obj !== null) {
    const cleanedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = deepCleanup(value as Cleanable);
      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        cleanedValue !== "" &&
        (typeof cleanedValue !== "object" ||
          (Array.isArray(cleanedValue)
            ? cleanedValue.length > 0
            : Object.keys(cleanedValue).length > 0))
      ) {
        cleanedObj[key] = cleanedValue;
      }
    }
    return (Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined) as
      | T
      | undefined;
  }

  return obj === "" ? undefined : obj;
}

export const filterOption = (
  input: string,
  option:
    | {
        value: string;
        label: string;
      }
    | undefined,
) =>
  (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase());
