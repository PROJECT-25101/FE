export const SEAT_STATUS: Record<string, { color: string }> = {
  available: {
    color: "#60a5fa",
  },
  hold: {
    color: "#d1d5db",
  },
  booked: {
    color: "#ffe4e6",
  },
};

// ${item.bookingStatus !== "hold" ? "bg-blue-400" : "bg-red-300"}
