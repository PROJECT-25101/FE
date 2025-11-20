import { ScheduleOutlined } from "@ant-design/icons";
import { Button, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import type { IScheduleCarIdRouteId } from "../../../../common/types/Schedule";
import dayjs from "dayjs";

const CardSchedule = ({ item }: { item: IScheduleCarIdRouteId }) => {
  const totalPickDescriptions = item.routeId.pickupPoint.district.reduce(
    (sum, d) => sum + (d.description.length || 0),
    0,
  );
  const totalDropDescriptions = item.routeId.dropPoint.district.reduce(
    (sum, d) => sum + (d.description?.length || 0),
    0,
  );
  return (
    <div
      className="bg-white shadow-lg border border-gray-300/50 w-full rounded-md py-4 px-6 grid"
      style={{
        gridTemplateColumns: "200px 1fr 1fr 100px",
      }}
    >
      <div className="leading-6">
        <p className="text-gray-700/60">Thông tin xe:</p>
        <Link
          to={`/admin/car/${item.carId._id}`}
          className="inline-block text-sm bg-white text-black! border border-black rounded px-2 py-[2px] font-bold tracking-wider shadow-[inset_0_0_3px_rgba(0,0,0,0.25)] uppercase font-mono"
        >
          {item.carId.licensePlate || "Chưa cập nhật"}
        </Link>
        <p className="mt-1">
          Loại xe: <Tag>{item.carId.type}</Tag>
        </p>
      </div>
      <div>
        <p className="text-gray-700/60">Thông tin tuyến đường:</p>
        <Link to="/admin/route" className="font-semibold text-base text-black!">
          {item.routeId.pickupPoint.label} - {item.routeId.dropPoint.label}
        </Link>
        <p className="text-gray-700/60">
          {totalPickDescriptions} Điểm đón - {totalDropDescriptions} Điểm trả
        </p>
      </div>
      <div>
        <p className="text-gray-700/60">Tổng lịch chạy:</p>
        <p className="font-medium text-sm">{item.count} Lịch chạy</p>
        <p className="text-xs">Đang hoạt động: {item.activeCount}</p>
        <p className="text-xs">Ngừng hoạt động: {item.inActiveCount}</p>
      </div>
      <div>
        <p className="text-gray-700/60">Thao tác:</p>
        <div className="mt-2 flex gap-2 items-center">
          <Tooltip title="Xem toàn bộ lịch chạy của tuyến đường và xe này.">
            <Link
              to={`/admin/schedule/show/${item.carId._id}/${item.routeId._id}?startTimeFrom=${dayjs().format("YYYY-MM-DD")}`}
            >
              <Button
                icon={<ScheduleOutlined />}
                style={{
                  background: `#0C7D41`,
                  color: "white",
                }}
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardSchedule;
