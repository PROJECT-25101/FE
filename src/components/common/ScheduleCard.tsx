import {
  CarOutlined,
  ClockCircleFilled,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import ViaCitiesModal from "../../pages/bookings/components/ViaCitiesModal";

const ScheduleCard = () => {
  return (
    <div
      className="bg-white w-full shadow-md rounded-md border border-gray-100 flex justify-around
     py-8 px-4"
    >
      <div className="flex gap-2 flex-col items-start">
        <p className="flex items-center gap-3 ">
          <ClockCircleFilled />
          <span className="text-blue-400 font-medium">19:15 - 03:45</span>
        </p>
        <p className="text-gray-400">Thời gian: 8 giờ 30 phút</p>
      </div>
      <div className="flex gap-2 flex-col items-start">
        <p>Quảng Bình - BX Nước Ngầm</p>
        <ViaCitiesModal>
          <button className="text-sm text-blue-400 cursor-pointer hover:bg-blue-100 px-2 rounded-md duration-300">
            <EnvironmentOutlined /> Thành phố đi qua
          </button>
        </ViaCitiesModal>
      </div>
      <div className="flex gap-2 flex-col items-start">
        <p className="flex items-center gap-2 text-xs">
          <CarOutlined />
          <span className="font-semibold text-orange-700 text-base">5/32</span>
          <span className="font-medium">Chỗ còn chống</span>
        </p>
        <p className="text-gray-400">Xe giường nằm</p>
      </div>
      <div className="flex items-center">
        <p className="text-orange-700 text-lg font-semibold">320,000</p>
      </div>
      <div className="flex items-center ">
        <Button
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
          Chọn chỗ
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCard;
