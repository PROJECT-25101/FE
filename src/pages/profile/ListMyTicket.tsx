import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useTable } from "../../common/hooks/useTable";
import { getMyOrder } from "../../common/services/order.service";
import type { IOrder } from "../../common/types/Order";
import TableCustom from "../../components/common/TableCustom";
import { columnUserTicket } from "./components/ColumnTicket";

const ListMyTicket = () => {
  const { query, onSelectPaginateChange, onFilter, getSorterProps } =
    useTable<IOrder>();
  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ORDER.ROOT, query],
    queryFn: () => getMyOrder(query),
  });
  const { data = [], meta } = response || {};
  return (
    <div className="shadow-lg mb-4 rounded-md p-6 max-w-7xl xl:mx-auto mx-6 mt-8">
      <div className="flex items-center justify-between">
        <p className="mt-2 text-lg font-semibold mb-4">Danh sách vé của tôi</p>
        <Link to={"/profile"}>Quay trở về</Link>
      </div>
      <TableCustom<IOrder>
        showPagination={(meta?.total as number) > 10}
        isLoading={isLoading}
        columns={columnUserTicket(getSorterProps)}
        dataSource={data || []}
        onFilter={onFilter}
        onSelectPaginateChange={onSelectPaginateChange}
        pageSize={meta?.limit || 10}
        totalDocs={meta?.total}
        currentPage={meta?.page || 1}
      />
    </div>
  );
};

export default ListMyTicket;
