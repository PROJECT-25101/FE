import {
  CarOutlined,
  ClockCircleFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import ViaCitiesModal from "../../pages/bookings/components/ViaCitiesModal";
import SeatPickSection from "./SeatPickSection";
import dayjs from "dayjs";
import type { ISchedule } from "../../common/types/Schedule";
import { formatCurrency } from "../../common/utils";

const ScheduleCard = ({ schedule }: { schedule: ISchedule }) => {
  const [isOpenSeatMap, setOpenSeatMap] = useState(false);
  console.log(schedule);
  return (
    <div className="w-full">
      <div
        className={`${isOpenSeatMap ? "bg-blue-100 border-blue-300" : "bg-white border-gray-100"} w-full shadow-md rounded-md border 0 flex justify-around
     py-8 px-4`}
      >
        <div className="flex gap-2 flex-col items-start">
          <p className="flex items-center gap-3 ">
            <ClockCircleFilled />
            <span className="text-blue-400 font-medium">
              {dayjs(schedule?.startTime).format("HH:mm")} -{" "}
              {dayjs(schedule?.arrivalTime).format("HH:mm")}
            </span>
          </p>
          <p className="text-gray-400">
            Thời gian dự kiến: {schedule?.routeId?.duration} giờ
          </p>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <p className="font-semibold text-base">
            {schedule?.routeId?.pickupPoint?.label} -{" "}
            {schedule?.routeId?.dropPoint?.label}
          </p>
          <ViaCitiesModal>
            <button className="text-sm text-blue-400 cursor-pointer hover:bg-blue-100 px-2 rounded-md duration-300">
              <EnvironmentOutlined /> Thành phố đi qua
            </button>
          </ViaCitiesModal>
        </div>
        <div className="flex gap-2 flex-col items-start">
          <div className="flex items-center gap-2 text-xs">
            <CarOutlined />
            <span className="font-semibold text-orange-700 text-base">
              5/{schedule.carId.maxSeatCapacity}
            </span>
            <p className="inline-block bg-white border border-black rounded px-2 py-[2px] text-xs font-bold tracking-wider shadow-[inset_0_0_3px_rgba(0,0,0,0.25)] uppercase font-mono">
              {schedule.carId.licensePlate || "Chưa cập nhật"}
            </p>
          </div>
          <p className="text-gray-400">{schedule.carId.type}</p>
        </div>
        <div className="flex items-center">
          <p className="text-orange-700 text-lg font-semibold">
            {formatCurrency(schedule.price as number)}
          </p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => setOpenSeatMap(!isOpenSeatMap)}
            style={{
              height: 40,
              width: 130,
              background: "#0c7d41",
              color: "white",
              border: "none",
              transition: "all 300ms ease-in-out",
              borderRadius: 25,
            }}
            className="hover:opacity-80"
          >
            {isOpenSeatMap ? "Ẩn" : "Chọn chỗ"}
          </Button>
        </div>
      </div>
      {isOpenSeatMap && <SeatPickSection />}
    </div>
  );
};

export default ScheduleCard;
