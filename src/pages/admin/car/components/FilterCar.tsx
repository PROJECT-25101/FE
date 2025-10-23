import { Input, Select } from "antd";
import { useTable } from "../../../../common/hooks/useTable";
import type { ICar } from "../../../../common/types/Car";
import { useEffect, useState } from "react";

const FilterCar = () => {
  const { query, onFilter, onSubmitSearch } = useTable<ICar>();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (query.search) {
      setSearchValue(query.search);
    }
  }, [query.search]);
  return (
    <div className="flex gap-4 items-center">
      <Input.Search
        value={searchValue}
        placeholder="Tìm kiếm theo tên, biển số..."
        style={{
          width: 250,
        }}
        allowClear
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={(e) => onSubmitSearch(e)}
      />
      <Select
        showSearch
        defaultValue={""}
        value={query.status || ""}
        style={{
          width: 150,
        }}
        onChange={(e) => onFilter({ status: [e] })}
        options={[
          {
            value: "",
            label: "Tất cả trạng thái",
          },
          {
            value: "true",
            label: "Đang hoạt động",
          },
          {
            value: "false",
            label: "Ngưng hoạt động",
          },
        ]}
      />
    </div>
  );
};

export default FilterCar;
