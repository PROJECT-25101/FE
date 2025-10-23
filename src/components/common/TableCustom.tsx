import type { TableColumnsType, TableProps } from "antd";
import { Pagination, Space, Table } from "antd";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

interface ITableCustom<T> {
  dataSource?: T[];
  columns: TableColumnsType<T>;
  totalDocs?: number;
  onFilter: (
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => void;
  onSelectPaginateChange: (page: number, pageSize: number) => void;
  currentPage: number;
  pageSize?: number;
  isLoading: boolean;
  showPagination: boolean;
}

const TableCustom = <T extends object>({
  dataSource,
  columns,
  totalDocs,
  onFilter,
  onSelectPaginateChange,
  currentPage,
  pageSize = 10,
  isLoading,
  showPagination,
}: ITableCustom<T>) => {
  const onChange: TableProps<T>["onChange"] = (_, filters, sorter) => {
    onFilter(filters, sorter);
  };

  return (
    <>
      <div style={{ minHeight: 300 }}>
        <Table<T>
          rowKey="_id"
          bordered={true}
          loading={isLoading}
          onChange={onChange}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{
            x: "horizontal",
          }}
        />
      </div>
      {showPagination && pageSize && currentPage && totalDocs && (
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <Pagination
            onChange={onSelectPaginateChange}
            pageSize={pageSize}
            total={totalDocs}
            pageSizeOptions={["5", "10", "15", "20", "25", "30"]}
            current={currentPage}
            showSizeChanger
          />
        </Space>
      )}
    </>
  );
};
export default TableCustom;
