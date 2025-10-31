import { Input, Select } from "antd";
import { useTable } from "../../../../common/hooks/useTable";
import { useEffect, useState } from "react";
import type { IRoute } from "../../../../common/types/Route";
import { useQuery } from "@tanstack/react-query";
import { getAllProvince } from "../../../../common/services/route.service";

const FilterRoute = () => {
  const { query, onFilter, onSubmitSearch } = useTable<IRoute>();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (query.search) {
      setSearchValue(query.search);
    }
  }, [query.search]);
  const { data, isLoading } = useQuery({
    queryKey: ["PROVINCE"],
    queryFn: () => getAllProvince(),
  });
  return (
    <div className="flex gap-4 items-center">
      <Input.Search
        value={searchValue}
        placeholder="Tìm kiếm tuyến đường"
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
      <Select
        showSearch
        defaultValue={""}
        allowClear
        loading={isLoading}
        value={query["pickupPoint._id"] || ""}
        style={{
          width: 150,
        }}
        onChange={(e) => onFilter({ "pickupPoint._id": [e] })}
        options={[
          { value: "", label: "Điểm đón" },
          ...(data?.data?.map((item) => ({
            value: item._id,
            label: item.label,
          })) || []),
        ]}
      />
      <Select
        showSearch
        defaultValue={""}
        allowClear
        loading={isLoading}
        value={query["dropPoint._id"] || ""}
        style={{
          width: 150,
        }}
        onChange={(e) => onFilter({ "dropPoint._id": [e] })}
        options={[
          { value: "", label: "Điểm trả" },
          ...(data?.data?.map((item) => ({
            value: item._id,
            label: item.label,
          })) || []),
        ]}
      />
    </div>
  );
};

export default FilterRoute;
