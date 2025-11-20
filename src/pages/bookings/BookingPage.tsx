import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../../common/hooks/useFilter";
import ScheduleCard from "../../components/common/ScheduleCard";
import FilterBooking from "./components/FilterBooking";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { getAllSchedules } from "../../common/services/schedule.service";
import { getAllRoute } from "../../common/services/route.service";
import { Spin } from "antd";

const BookingPage = () => {
  const { query } = useFilter();
  console.log(query);
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
    queryKey: [QUERY_KEY.SCHEDULE, "CLIENT", ...Object.values(query)],
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
          <FilterBooking
            initialValues={{
              date: otherQuery.startTimeFrom,
              dropPointId: dropPointId,
              pickupPointId: pickPointId,
            }}
          />
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
          <div className="flex flex-col mt-8 gap-6 items-center">
            {data?.data?.map((item, index: number) => (
              <ScheduleCard key={index} schedule={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
