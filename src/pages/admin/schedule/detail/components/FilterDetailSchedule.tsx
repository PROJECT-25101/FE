import { DatePicker, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { useTable } from "../../../../../common/hooks/useTable";
import { STATUS_SCHEDULE } from "../../../../../common/constants/status";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const FilterDetailSchedule = () => {
  const { query, onFilter } = useTable();
  const handleChangeRangePicker: RangePickerProps["onChange"] = (
    _,
    dateStrings,
  ) => {
    onFilter({
      startTimeFrom: [dateStrings[0]],
      startTimeTo: [dateStrings[1]],
    });
  };
  const options = (
    Object.keys(STATUS_SCHEDULE) as (keyof typeof STATUS_SCHEDULE)[]
  ).map((key) => ({
    value: key,
    label: STATUS_SCHEDULE[key],
  }));

  return (
    <div className="flex flex-1 items-center gap-6">
      <div>
        <p className="mb-1">Khoảng thời gian</p>
        <RangePicker
          value={[
            query.startTimeFrom ? dayjs(query.startTimeFrom) : null,
            query.startTimeTo ? dayjs(query.startTimeTo) : null,
          ]}
          onChange={handleChangeRangePicker}
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
        />
      </div>
      <div>
        <p className="mb-1">Hoạt động</p>
        <Select
          style={{
            width: 150,
          }}
          allowClear
          value={query?.isDisable || ""}
          onChange={(e) => onFilter({ isDisable: [e] })}
          placeholder="Lọc theo hoạt động"
          options={[
            {
              value: "",
              label: "Tất cả trạng thái",
            },
            {
              value: "false",
              label: "Hoạt động",
            },
            {
              value: "true",
              label: "Ngưng hoạt động",
            },
          ]}
        />
      </div>
      <div>
        <p className="mb-1">Trạng thái</p>
        <Select
          style={{
            width: 150,
          }}
          value={query?.status || ""}
          allowClear
          placeholder="Trạng thái lịch chạy"
          onChange={(e) => onFilter({ status: [e] })}
          options={[{ value: "", label: "Tất cả trạng thái" }, ...options]}
        />
      </div>
    </div>
  );
};

export default FilterDetailSchedule;
