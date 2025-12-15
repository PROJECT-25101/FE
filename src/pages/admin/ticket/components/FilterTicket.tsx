import { Input, Select } from "antd";
import dayjs from "dayjs";
import { useTable } from "../../../../common/hooks/useTable";

const FilterTicket = () => {
  const { query, onFilter } = useTable();
  return (
    <div className="flex items-center gap-6">
      <Input.Search
        placeholder="Tìm kiếm theo thông tin khách hàng"
        defaultValue={query?.search?.[0]}
        onSearch={(value) => onFilter({ search: value ? [value] : null })}
        onChange={(e) => {
          if (!e.target.value) onFilter({ search: null });
        }}
      />

      <Select
        defaultValue={query?.createdAtFrom ? "NEWEST" : ""}
        options={[
          { value: "", label: "Tất cả vé" },
          { value: "NEWEST", label: "Vé ngày hôm nay" },
          { value: "RANGE", label: "Lọc theo khoảng" },
        ]}
        onChange={(value) => {
          if (!value) {
            onFilter({
              createdAtFrom: null,
              createdAtTo: null,
            });
          } else if (value === "NEWEST") {
            onFilter({
              createdAtFrom: [dayjs().startOf("day").toISOString()],
              createdAtTo: [dayjs().endOf("day").toISOString()],
            });
          } else if (value === "RANGE") {
            onFilter({
              createdAtFrom: null,
              createdAtTo: null,
            });
          }
        }}
        style={{ width: 250 }}
      />

      <Select
        allowClear
        defaultValue={query?.status?.[0]}
        onChange={(value) =>
          onFilter({
            status: value ? [value] : null,
          })
        }
        style={{ width: 150 }}
        placeholder="Chọn trạng thái"
        options={[
          { value: "BUYED", label: "Đã mua" },
          { value: "USED", label: "Đã sử dụng" },
          { value: "CANCELLED", label: "Đã huỷ" },
        ]}
      />
    </div>
  );
};

export default FilterTicket;
