import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { getAllCar } from "../../../../common/services/car.service";
import { Select } from "antd";
import { getAllRoute } from "../../../../common/services/route.service";
import { useTable } from "../../../../common/hooks/useTable";
import type { ICar } from "../../../../common/types/Car";
import { filterOption } from "../../../../common/utils";

const FilterSchedule = () => {
  const { onFilter } = useTable<ICar>();

  const { data: cars } = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT],
    queryFn: () => getAllCar({ disablePagination: true }),
  });
  const { data: routes } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT],
    queryFn: () => getAllRoute({ disablePagination: true }),
  });
  return (
    <div className="flex items-center gap-6">
      <Select
        style={{ width: 300 }}
        allowClear
        showSearch
        placeholder="Lọc theo xe"
        onChange={(e) => onFilter({ carId: [e] })}
        options={cars?.data?.map((item) => ({
          value: item._id,
          label: item.licensePlate,
        }))}
        filterOption={filterOption}
      />

      <Select
        style={{ width: 300 }}
        placeholder="Lọc theo tuyến đường"
        allowClear
        showSearch
        onChange={(e) => onFilter({ routeId: [e] })}
        options={routes?.data?.map((item) => ({
          value: item._id,
          label: `${item.pickupPoint.label} - ${item.dropPoint.label}`,
        }))}
        filterOption={filterOption}
      />
    </div>
  );
};

export default FilterSchedule;
