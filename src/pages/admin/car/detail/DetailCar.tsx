import { useQuery } from "@tanstack/react-query";
import { Descriptions, Spin, Tag, Tooltip } from "antd";
import { Link, useParams } from "react-router";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { getDetailCar } from "../../../../common/services/car.service";
import { getFloorByCar } from "../../../../common/services/seat.service";
import { EditOutlined } from "@ant-design/icons";

const seatStatuses = [
  { label: "Khả dụng", color: "bg-blue-300", desc: "Ghế khả dụng" },
  {
    label: "Không khả dụng",
    color: "bg-red-300",
    desc: "Ghế không không khả dụng",
  },
];

const DetailCar = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT, id],
    queryFn: () => getDetailCar(id as string),
  });
  const { data: floors, isLoading: isLoadingFloor } = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT, QUERY_KEY.SEAT.ROOT],
    queryFn: () => getFloorByCar(id as string),
  });
  const carData = data?.data;
  return (
    <div className="bg-white w-full min-h-[80dvh] rounded-md shadow-sm px-6 py-4">
      {isLoading && (
        <div className="min-h-[80vh] flex items-center justify-center">
          <Spin />
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-lg">
              Thông tin chi tiết xe <Tag>{carData?._id}</Tag>
            </h2>
            <Link
              to={"/admin/car"}
              className="text-[#0C7D41]! opacity-80 hover:underline!"
            >
              Quay về danh sách
            </Link>
          </div>
          <div className="mt-4">
            <Tag color="green" className="text-sm! font-medium">
              Thông tin chung
            </Tag>
            <Descriptions bordered className="mt-4!">
              <Descriptions.Item label="Biển số xe" span={"filled"}>
                {carData?.licensePlate}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="mt-4">
            <Tag color="green" className="text-sm! font-medium">
              Thông tin loại xe
            </Tag>
            <Descriptions bordered className="mt-4!">
              <Descriptions.Item label="Hãng xe">
                {carData?.model?.brand}
              </Descriptions.Item>
              <Descriptions.Item label="Loại xe" span={"filled"}>
                {carData?.model.model}
              </Descriptions.Item>
              <Descriptions.Item span={"filled"} label="Kiểu xe">
                {carData?.type}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="mt-4 pb-8">
            <Tag color="green" className="text-sm! font-medium">
              Thông tin loại xe
            </Tag>
            {isLoadingFloor && (
              <div className="min-h-[20vh] flex items-center justify-center">
                <Spin />
              </div>
            )}
            {!isLoadingFloor && (
              <>
                <div className="flex flex-wrap items-start justify-center gap-44 w-full">
                  {floors?.data?.map((items, floorIndex) => {
                    return (
                      <div key={floorIndex}>
                        <p className="text-center font-semibold mb-4">
                          Tầng {floorIndex + 1}
                        </p>
                        <div
                          className="grid gap-x-4 gap-y-4"
                          style={{
                            gridTemplateColumns: `repeat(${items?.cols}, 1fr)`,
                            gridTemplateRows: `repeat(${items?.rows}, 1fr)`,
                          }}
                        >
                          {items.seats.map((seat, seatIndex) => (
                            <div
                              key={seatIndex}
                              className={`w-14 h-8 font-semibold text-xs rounded-full flex duration-300 ${seat.status ? "bg-blue-400" : "bg-red-300"} hover:opacity-85 cursor-pointer items-center justify-center`}
                              style={{
                                gridColumnStart: seat.col,
                                gridRowStart: seat.row,
                              }}
                            >
                              {seat.seatLabel}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end text-xs mt-8 gap-6">
                  {seatStatuses.map((status) => (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Tooltip
                        key={status.label}
                        title={status.desc}
                        placement="top"
                      >
                        <div className="bg-white p-0.5 rounded-sm">
                          <div
                            className={`w-6 h-4 rounded-sm ${status.color}`}
                          />
                        </div>
                      </Tooltip>
                      <span>{status.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <Link
        to={`/admin/car/update/${id}`}
        style={{ background: "#0C7D41" }}
        className="hover:opacity-85! inline-block items-center px-4 py-1 my-2 gap-2 text-white! rounded-md"
      >
        <EditOutlined className="mr-1!" /> Chỉnh sửa
      </Link>
    </div>
  );
};

export default DetailCar;
