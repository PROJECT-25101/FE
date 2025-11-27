import type { ISeat } from "../types/Seat";

export const getStatusColorSeat = (
  item: ISeat & {
    bookingStatus: "available" | "hold" | "booked";
    userId: string | null;
  },
  userId: string,
) => {
  if (!item.status) return "#fca5a5";
  switch (item.bookingStatus) {
    case "available":
      return "#60a5fa";
    case "hold":
      return "#d1d5db";
    case "booked":
      if (item.userId === userId) {
        return "#FFFCD1";
      }
      return "#ffe4e6";
    default:
      return "#60a5fa";
  }
};
