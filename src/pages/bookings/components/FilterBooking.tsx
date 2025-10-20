import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Select } from "antd";

const FilterBooking = () => {
  return (
    <div className="flex items-center gap-3">
      <Select
        showSearch
        placeholder="Chọn điểm xuất phát"
        style={{
          maxWidth: 150,
          height: 40,
        }}
        optionFilterProp="label"
        options={[
          {
            label: "Hà Nội",
            value: "Jack",
          },
          {
            label: "Thanh Hoá",
            value: "Lucy",
          },
          {
            label: "Nghệ An",
            value: "Tom",
          },
        ]}
      />
      <Select
        showSearch
        placeholder="Chọn điểm xuất phát"
        style={{
          maxWidth: 150,
          height: 40,
        }}
        optionFilterProp="label"
        options={[
          {
            label: "Hà Nội",
            value: "Jack",
          },
          {
            label: "Thanh Hoá",
            value: "Lucy",
          },
          {
            label: "Nghệ An",
            value: "Tom",
          },
        ]}
      />
      <DatePicker
        style={{
          maxWidth: 130,
          height: 40,
        }}
      />
      <Button
        icon={<SearchOutlined />}
        type="primary"
        style={{
          height: 40,
          borderRadius: "25px",
          background: "#0c7d41",
          fontSize: 16,
        }}
      >
        Đặt vé
      </Button>
    </div>
  );
};

export default FilterBooking;
