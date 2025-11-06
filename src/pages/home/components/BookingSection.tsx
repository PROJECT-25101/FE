import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { createSearchParams, useNavigate } from "react-router";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { getPointRoute } from "../../../common/services/route.service";
import type { IPointSelect } from "../../../common/types/Route";
import { formRules } from "../../../common/utils/formRules";

const BookingSection = () => {
  const [form] = Form.useForm();
  const pickupPoint = Form.useWatch("pickupPoint", form);
  const dropPoint = Form.useWatch("dropPoint", form);
  const nav = useNavigate();
  const { data: dataPick } = useQuery({
    queryKey: [QUERY_KEY.POINT.PICK],
    queryFn: () => getPointRoute(),
  });
  const { data: dataDrop } = useQuery({
    queryKey: [QUERY_KEY.POINT.DROP, pickupPoint],
    queryFn: () => getPointRoute({ pickupPointId: pickupPoint.value }),
    enabled: !!pickupPoint,
  });
  const handleSubmit = (values: {
    pickupPoint: IPointSelect;
    dropPoint: IPointSelect;
    time: string;
  }) => {
    const selectedDate = dayjs(values.time);
    const isToday = selectedDate.isSame(dayjs(), "day");
    const startTimeFrom = isToday
      ? dayjs().add(2, "hour").second(0).millisecond(0).toISOString()
      : selectedDate.startOf("day").toISOString();
    console.log(startTimeFrom);
    const startTimeTo = selectedDate.endOf("day").toISOString();
    const params = {
      startTimeFrom,
      startTimeTo,
      "pickupPoint._id": values.pickupPoint.value,
      "dropPoint._id": values.dropPoint.value,
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    nav({
      pathname: "/bookings",
      search: `?${createSearchParams(params)}`,
    });
  };
  return (
    <div className="py-8 bg-[#fff200]/30">
      <h2 className="text-2xl uppercase font-bold text-center">
        Đặt vé xe ngay
      </h2>
      <div className="max-w-7xl mx-6 xl:mx-auto py-8">
        <Form onFinish={handleSubmit} form={form}>
          <div className="flex gap-6">
            <Form.Item
              style={{ flex: 1 }}
              name={"pickupPoint"}
              rules={[formRules.required("Điểm đi", true)]}
            >
              <Select
                style={{ height: 50 }}
                labelInValue
                allowClear
                onChange={() => form.setFieldValue("dropPoint", null)}
                onClear={() => {
                  form.setFieldValue("dropPoint", null);
                }}
                options={dataPick?.data.map((item) => ({
                  value: item._id,
                  label: item.label,
                }))}
                placeholder="Chọn điểm đi"
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name={"dropPoint"}
              rules={[formRules.required("Điểm đến", true)]}
            >
              <Select
                style={{ height: 50 }}
                options={dataDrop?.data.map((item) => ({
                  value: item._id,
                  label: item.label,
                }))}
                placeholder="Chọn điểm đi"
                disabled={!pickupPoint}
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name={"time"}
              rules={[formRules.required("Ngày di chuyển", true)]}
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: 50,
                }}
                placeholder="Chọn ngày di chuyển"
                disabled={!dropPoint || !pickupPoint}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  background: `#0C7D41`,
                  color: "white",
                  height: 50,
                  fontWeight: 700,
                  width: 150,
                  border: "none",
                  outline: "none",
                }}
                className="hover:opacity-80!"
              >
                Tìm chuyến đi
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookingSection;
