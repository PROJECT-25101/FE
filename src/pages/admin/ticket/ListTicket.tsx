import { QrcodeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { useTable } from "../../../common/hooks/useTable";
import { getAllOrder } from "../../../common/services/order.service";
import type { IOrder } from "../../../common/types/Order";
import TableCustom from "../../../components/common/TableCustom";
import { columnTicket } from "./components/ColumnTicket";
import FilterTicket from "./components/FilterTicket";

const ListTicket = () => {
  const { query, getSorterProps, onFilter, onSelectPaginateChange } =
    useTable<IOrder>();
  const { data: response, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY.ORDER.ROOT,
      ...Object.keys(query),
      ...Object.values(query),
    ],
    queryFn: () =>
      getAllOrder({
        searchFields: [
          "customerInfo.userName",
          "customerInfo.phone",
          "customerInfo.email",
        ],
        ...query,
      }),
  });
  const { data = [], meta } = response || {};
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-4">Quản lý vé đã đặt</h3>
        <Link to={`/admin/ticket/scan`} className="text-4xl!">
          <QrcodeOutlined />
        </Link>
      </div>
      <FilterTicket />
      <div className="mt-4">
        <TableCustom<IOrder>
          showPagination={(meta?.total as number) > 10}
          isLoading={isLoading}
          columns={columnTicket(getSorterProps)}
          dataSource={data || []}
          onFilter={onFilter}
          onSelectPaginateChange={onSelectPaginateChange}
          pageSize={meta?.limit || 10}
          totalDocs={meta?.total}
          currentPage={meta?.page || 1}
        />
      </div>
    </div>
  );
};

export default ListTicket;
