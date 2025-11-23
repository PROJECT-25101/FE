import { useQuery } from "@tanstack/react-query";
import { Button, Pagination, Spin } from "antd";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { useTable } from "../../../common/hooks/useTable";
import { getAllScheduleCarRoute } from "../../../common/services/schedule.service";
import type { ISchedule } from "../../../common/types/Schedule";
import CardSchedule from "./components/CardSchedule";
import FilterSchedule from "./components/FilterSchedule";
import ModalCreateSchedule from "./components/ModalCreateSchedule";

const ListSchedule = () => {
  const { query, onSelectPaginateChange } = useTable<ISchedule>();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.SCHEDULE.ROOT, ...Object.values(query)],
    queryFn: () => getAllScheduleCarRoute({ limit: 5, ...query }),
  });
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">
        Lịch chạy của xe và tuyến đường
      </h3>
      <div className="flex items-center justify-between">
        <FilterSchedule />
        <ModalCreateSchedule>
          <Button
            style={{
              background: `#0C7D41`,
              color: "white",
            }}
          >
            Tạo lịch chạy
          </Button>
        </ModalCreateSchedule>
      </div>
      {isLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        data?.data?.length !== 0 && (
          <>
            {" "}
            <div className="mt-4 flex flex-col gap-4">
              {data?.data.map((item, index) => (
                <CardSchedule item={item} key={index} />
              ))}
            </div>
            <div className="mt-4">
              <Pagination
                align="end"
                onChange={onSelectPaginateChange}
                current={data?.meta?.page}
                pageSize={data?.meta?.limit}
                total={data?.meta?.total}
              />
            </div>
          </>
        )
      )}
      {data?.data.length === 0 && (
        <div className="min-h-[30vh] flex items-center justify-center">
          <p className="text-base">Không có lịch chạy nào</p>
        </div>
      )}
    </div>
  );
};

export default ListSchedule;
