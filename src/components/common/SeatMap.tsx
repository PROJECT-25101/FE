import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useToast } from "../../common/hooks/useToast";
import { toogleSeat } from "../../common/services/seat.schedule.service";
import { useAuthSelector } from "../../common/store";
import type { ISeat } from "../../common/types/Seat";
import type {
  IPayloadSeatSchedue,
  ISeatSchedule,
} from "../../common/types/Seat.schedule";
import { getStatusColorSeat } from "../../common/utils/statusSeat";

export default function SeatMap({
  floor,
  scheduleId,
}: {
  floor: ISeatSchedule;
  scheduleId: string;
}) {
  const userId = useAuthSelector((state) => state.user?._id);
  const queryClient = useQueryClient();
  const { handleAxiosError } = useToast();
  const { mutate } = useMutation({
    mutationFn: (payload: IPayloadSeatSchedue) => toogleSeat(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SEAT.ROOT),
      });
    },
    onError: (err) => handleAxiosError(err),
  });
  const handleToogleSeat = (
    seat: ISeat & { bookingStatus: "available" | "hold" | "booked" },
  ) => {
    console.log(scheduleId);
    const payload: IPayloadSeatSchedue = {
      seatId: seat._id,
      scheduleId,
    };
    mutate(payload);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div
        className={`grid gap-x-12 gap-y-4`}
        style={{ gridTemplateColumns: `repeat(${floor.cols}, 1fr)` }}
      >
        {floor.seats.map((item) => (
          <div
            onClick={() => handleToogleSeat(item)}
            key={item._id}
            style={{
              background: getStatusColorSeat(item, userId as string),
            }}
            className={`w-14 h-8 font-semibold  text-xs  rounded-full flex duration-300 items-center justify-center cursor-pointer hover:opacity-70 transition-opacity`}
          >
            {item.seatLabel}
          </div>
        ))}
      </div>
    </div>
  );
}
