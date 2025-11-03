import { AppstoreAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { useTable } from "../../../common/hooks/useTable";
import { getAllCar } from "../../../common/services/car.service";
import type { ICar } from "../../../common/types/Car";
import TableCustom from "../../../components/common/TableCustom";
import { columnCar } from "./components/ColumnCar";
import FilterCar from "./components/FilterCar";

const ListCar = () => {
  const { query, onFilter, onSelectPaginateChange, getSorterProps } =
    useTable<ICar>();
  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT, ...Object.values(query)],
    queryFn: () => getAllCar({ searchFields: ["licensePlate"], ...query }),
  });
  const { data = [], meta } = response || {};
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Danh sách xe</h3>
      <div className="flex justify-between mb-6">
        <FilterCar />
        <Link
          to={"/admin/car/create"}
          style={{ background: "#0C7D41" }}
          className="hover:opacity-85! flex items-center px-4 py-1 gap-2 text-white! rounded-md"
        >
          <AppstoreAddOutlined /> Thêm xe mới
        </Link>
      </div>
      <TableCustom
        showPagination={(meta?.total as number) > 10}
        isLoading={isLoading}
        columns={columnCar(getSorterProps)}
        dataSource={data}
        onFilter={onFilter}
        onSelectPaginateChange={onSelectPaginateChange}
        pageSize={meta?.limit || 10}
        totalDocs={meta?.total}
        currentPage={meta?.page || 1}
      />
    </div>
  );
};

export default ListCar;
