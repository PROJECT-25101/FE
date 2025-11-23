import { useQuery } from "@tanstack/react-query";
import { Button, Tag } from "antd";
import { Link, useParams } from "react-router";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useTable } from "../../../../common/hooks/useTable";
import {
  getAllScheduleByCarIdRouteId,
  getAllScheduleCarRoute,
} from "../../../../common/services/schedule.service";
import type {
  ISchedule,
  IScheduleCarIdRouteId,
} from "../../../../common/types/Schedule";
import TableCustom from "../../../../components/common/TableCustom";
import { columnSchedule } from "./components/ColumnSchedule";
import FilterDetailSchedule from "./components/FilterDetailSchedule";
import ModalCreateScheduleDetail from "./createSchedule/ModalCreateScheduleDetail";

const DetailSchedule = () => {
  const { carId, routeId } = useParams();
  const { query, onSelectPaginateChange, onFilter } = useTable<ISchedule>();
  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY.SCHEDULE.ROOT,
      carId,
      routeId,
      ...Object.keys(query),
      ...Object.values(query),
    ],
    queryFn: () =>
      getAllScheduleByCarIdRouteId(carId as string, routeId as string, {
        ...query,
        limit: 7,
        sort: "startTime",
        order: "asc",
      }),
  });
  const { data: generalData } = useQuery({
    queryKey: [QUERY_KEY.SCHEDULE.ROOT, "GENERAL", carId, routeId],
    queryFn: () => getAllScheduleCarRoute({ carId, routeId }),
  });
  const general = generalData?.data[0] || ({} as IScheduleCarIdRouteId);
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold mb-4">Danh sách lịch chạy</h3>
        <Link
          className="text-[#0C7D41]! hover:underline!"
          to={"/admin/schedule"}
        >
          Quay trở về danh sách
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <p>
            Xe:{" "}
            <span className="inline-block text-xs bg-white text-black! border border-black rounded px-2 py-[2px] font-bold tracking-wider shadow-[inset_0_0_3px_rgba(0,0,0,0.25)] uppercase font-mono">
              {general?.carId?.licensePlate || "Chưa cập nhật"}
            </span>
          </p>
          <p className="mt-2">
            Tuyến đường:{" "}
            <Tag>
              {general?.routeId?.pickupPoint?.label} -{" "}
              {general?.routeId?.dropPoint?.label}
            </Tag>
          </p>
          <p className="mt-2">Tổng lịch chạy hiện có: {general?.count}</p>
          <p className="mt-2">
            Ngày chạy trong tuần:{" "}
            <Tag>
              {general?.dayOfWeek?.length === 7
                ? "Hàng tuần"
                : general?.dayOfWeek
                    ?.map((item) => DAYOFWEEK_LABEL[item])
                    ?.join(", ")}
            </Tag>
          </p>
        </div>
        <div>
          <Tag color="blue">Đang chạy/ Sắp chạy: {general.activeCount}</Tag>
          <br />
          <Tag color="green" className="mt-2!">
            Hoàn thành: 0
          </Tag>
          <br />
          <Tag color="red" className="mt-2!">
            Đang khoá: {general.inActiveCount}
          </Tag>
        </div>
      </div>
      <div className="bg-gray-300 w-full h-[0.5px] mt-4" />
      <div className="mt-4 flex items-center">
        <FilterDetailSchedule />
        <ModalCreateScheduleDetail car={general.carId} route={general.routeId}>
          <Button
            style={{
              background: `#0C7D41`,
              color: "white",
            }}
          >
            Tạo lịch chạy
          </Button>
        </ModalCreateScheduleDetail>
      </div>
      <div className="mt-6">
        <TableCustom<ISchedule>
          onSelectPaginateChange={onSelectPaginateChange}
          isLoading={isLoading}
          onFilter={onFilter}
          columns={columnSchedule()}
          showPagination={true}
          dataSource={data?.data}
          pageSize={data?.meta?.limit || 10}
          totalDocs={data?.meta?.total}
          currentPage={data?.meta?.page || 1}
        />
      </div>
    </div>
  );
};

export default DetailSchedule;
