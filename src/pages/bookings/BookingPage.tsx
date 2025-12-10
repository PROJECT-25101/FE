import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin } from "antd";
import { useState } from "react";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useTable } from "../../common/hooks/useTable";
import { useUnHoldOnBack } from "../../common/hooks/useUnHoldOnBack";
import { getAllRoute } from "../../common/services/route.service";
import { getAllSchedules } from "../../common/services/schedule.service";
import ScheduleCard from "../../components/common/ScheduleCard";
import FilterBooking from "./components/FilterBooking";

const BookingPage = () => {
  const [openScheduleId, setOpenScheduleId] = useState<string | null>(null);
  useUnHoldOnBack();
  const { query, onSelectPaginateChange } = useTable();
  const { pickPointId, dropPointId, ...otherQuery } = query;
  const { data: routeData } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT, pickPointId, dropPointId],
    queryFn: () =>
      getAllRoute({
        status: true,
        "pickupPoint._id": pickPointId,
        "dropPoint._id": dropPointId,
      }),
  });
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SCHEDULE.ROOT, "CLIENT", ...Object.values(query)],
    queryFn: () => {
      const routeIds = routeData?.data.map((item) => item._id);
      console.log(routeIds);
      return getAllSchedules({ ...otherQuery, routeId: routeIds });
    },
    enabled: !!routeData?.data?.length,
  });
  return (
    <div className="bg-gray-100 py-8 min-h-screen">
      <div className="max-w-7xl xl:mx-auto mx-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="./bus.png" alt="" />
            <h2 className="text-2xl font-medium">
              {routeData?.data[0]?.pickupPoint?.label}
              {` - ${routeData?.data[0]?.dropPoint?.label}`}
            </h2>
            <span className="text-red-500 text-xs bg-red-100 px-4 inline-block py-1 rounded-full">
              {data?.data.length || 0} chuyến
            </span>
          </div>
          {pickPointId && (
            <FilterBooking
              initialValues={{
                date: otherQuery.startTimeFrom,
                dateTo: otherQuery.startTimeTo,
                dropPointId: dropPointId,
                pickupPointId: pickPointId,
              }}
            />
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spin size="large" />
          </div>
        ) : data?.data.length === 0 ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="text-red-500 text-base">
              Không có lịch chạy nào trong khoảng thời gian này
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-col mt-4 gap-6 items-center">
              {data?.data?.map((item, index: number) => (
                <ScheduleCard
                  key={index}
                  schedule={item}
                  openScheduleId={openScheduleId}
                  setOpenScheduleId={setOpenScheduleId}
                />
              ))}
            </div>
            <div className="mt-6">
              <Pagination
                current={data?.meta?.page}
                align="center"
                total={data?.meta?.total}
                pageSize={data?.meta?.limit}
                onChange={onSelectPaginateChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
