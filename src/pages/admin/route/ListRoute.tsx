import { AppstoreAddOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { Link } from "react-router";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { useTable } from "../../../common/hooks/useTable";
import { getAllRoute } from "../../../common/services/route.service";
import FilterRoute from "./components/FilterRoute";
import RouteCard from "./components/RouteCard";

const ListRoute = () => {
  const { query, onSelectPaginateChange } = useTable();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT, ...Object.values(query)],
    queryFn: () => getAllRoute({ ...query, limit: 6, searchFields: ["name"] }),
  });
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <h3 className="text-xl font-semibold mb-4">Danh sách tuyến đường</h3>
      <div className="flex justify-between mb-6">
        <FilterRoute />
        <Link
          to={"/admin/car/create"}
          style={{ background: "#0C7D41" }}
          className="hover:opacity-85! flex items-center px-4 py-1 gap-2 text-white! rounded-md"
        >
          <AppstoreAddOutlined /> Thêm tuyến đường
        </Link>
      </div>
      {!isLoading && data?.data.length !== 0 && (
        <div className="grid grid-cols-3 gap-8">
          {data?.data.map((item, index) => (
            <RouteCard item={item} key={index} />
          ))}
        </div>
      )}
      <div className="mt-4">
        <Pagination
          align="end"
          onChange={onSelectPaginateChange}
          current={data?.meta?.page}
          pageSize={data?.meta?.limit}
          total={data?.meta?.total}
        />
      </div>
    </div>
  );
};

export default ListRoute;
