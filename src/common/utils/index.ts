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
