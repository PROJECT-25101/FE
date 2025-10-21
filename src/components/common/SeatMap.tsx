import { useBookingSelector } from "../../common/store/useBookingStore";

interface SeatMapProps {
  totalSeats: number;
  cols: number; // số cột
}

export default function SeatMap({ totalSeats = 16, cols }: SeatMapProps) {
  const seats = Array.from({ length: totalSeats });
  const toogleSeat = useBookingSelector((state) => state.toggleSeat);
  const holdSeat = useBookingSelector((state) => state.seats);
  const handleHoldSeat = (id: string) => {
    if (holdSeat.length >= 4) return;
    toogleSeat(id);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div
        className={`grid gap-x-12 gap-y-4`}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {seats.map((_, idx) => (
          <div
            onClick={() => handleHoldSeat(idx.toString())}
            key={idx}
            className={`w-14 h-8 font-semibold text-xs ${holdSeat.includes(idx.toString()) ? "bg-gray-300 border-black border" : "bg-blue-300 "} rounded-full flex duration-300 items-center justify-center cursor-pointer hover:opacity-70 transition-opacity`}
          >
            {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
