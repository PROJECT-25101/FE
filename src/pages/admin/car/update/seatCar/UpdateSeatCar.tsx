import { AppstoreAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin, Tag, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router";
import { QUERY_KEY } from "../../../../../common/constants/queryKey";
import { getFloorByCar } from "../../../../../common/services/seat.service";
import ModalAddFloor from "./components/ModalAddFloor";
import SeatMapUpdate from "./components/SeatMapUpdate";
const seatStatuses = [
  { label: "Khả dụng", color: "bg-blue-300", desc: "Ghế khả dụng" },
  {
    label: "Không khả dụng",
    color: "bg-red-300",
    desc: "Ghế không không khả dụng",
  },
];
const UpdateSeatCar = () => {
  const { id: carId } = useParams();
  const nav = useNavigate();
  const seatResponse = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT, QUERY_KEY.SEAT.ROOT, carId],
    queryFn: () => getFloorByCar(carId as string),
  });

  return (
    <div className="bg-white w-full min-h-[60dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          Chỉnh sửa ghế <Tag>#{carId}</Tag>
        </h3>
        <p
          onClick={() => nav(-1)}
          className="text-[#0C7D41]! hover:opacity-85 cursor-pointer hover:underline!"
        >
          Quay về
        </p>
      </div>
      <div className="h-[1px] bg-gray-300 w-full my-4"></div>
      {seatResponse.isLoading && (
        <div className="flex items-center justify-center min-h-[30vh]">
          <Spin />
        </div>
      )}
      {!seatResponse.isLoading && (
        <>
          <div className="flex flex-wrap items-start justify-center gap-12 w-full">
            {seatResponse.data?.data?.map((items, floorIndex) => {
              return (
                <SeatMapUpdate
                  floorIndex={floorIndex}
                  items={items}
                  carId={carId as string}
                />
              );
            })}
            {seatResponse &&
              seatResponse.data &&
              seatResponse.data?.data?.length < 2 && (
                <ModalAddFloor
                  nextFloorNumber={seatResponse.data.data.length + 1}
                >
                  <div className="w-[200px] flex items-center border-2 border-dashed border-gray-400 justify-center h-[200px] rounded-lg group cursor-pointer duration-300 hover:border-black">
                    <AppstoreAddOutlined className="text-xl! text-gray-400! group-hover:text-black!" />
                  </div>
                </ModalAddFloor>
              )}
          </div>
          <div className="flex items-center justify-end text-xs mt-8 gap-6">
            {seatStatuses.map((status) => (
              <div
                key={status.label}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Tooltip key={status.label} title={status.desc} placement="top">
                  <div className="bg-white p-0.5 rounded-sm">
                    <div className={`w-6 h-4 rounded-sm ${status.color}`} />
                  </div>
                </Tooltip>
                <span>{status.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateSeatCar;
