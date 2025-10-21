import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";

interface BookingState {
  seats: string[];
  toggleSeat: (seat: string) => void;
  clearSeats: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        seats: [],
        toggleSeat: (seat) => {
          const currentSeats = get().seats;
          const isSelected = currentSeats.includes(seat);
          if (isSelected) {
            set({ seats: currentSeats.filter((s) => s !== seat) });
          } else {
            set({ seats: [...currentSeats, seat] });
          }
        },
        clearSeats: () => set({ seats: [] }),
      }),
      { name: "booking-storage" },
    ),
    { name: "BookingStore" },
  ),
);

export const useBookingSelector = <T>(
  selector: (state: BookingState) => T,
): T => useBookingStore(useShallow(selector));
