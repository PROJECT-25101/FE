import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Select } from "antd";
import { getPointRoute } from "../../../common/services/route.service";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import type { IPointSelect } from "../../../common/types/Route";
import dayjs from "dayjs";
import { createSearchParams, useNavigate } from "react-router";
import { formRules } from "../../../common/utils/formRules";
import { useEffect } from "react";

type TInitialValues = {
  pickupPointId: string;
  dropPointId: string;
  date: string;
  dateTo: string | null;
};
const FilterBooking = ({
  initialValues,
}: {
  initialValues: TInitialValues;
}) => {
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
    queryFn: () =>
      getPointRoute({
        pickupPointId: pickupPoint.value
          ? pickupPoint.value
          : initialValues.pickupPointId,
      }),
    enabled: !!initialValues.pickupPointId,
  });
  const handleSubmit = (values: {
    pickupPoint: IPointSelect;
    dropPoint: IPointSelect;
    time: string;
  }) => {
    let startTimeFrom;
    let startTimeTo;
    const now = dayjs();
    if (values.time) {
      const selectedLocal = dayjs(values.time);
      const isToday = selectedLocal.isSame(now, "day");
      if (isToday) {
        const plus2h = now.add(2, "hour");
        startTimeFrom = plus2h.second(0).millisecond(0).toISOString();
        startTimeTo = now.endOf("day").toISOString();
      } else {
        startTimeFrom = selectedLocal.startOf("day").toISOString();
        startTimeTo = selectedLocal.endOf("day").toISOString();
      }
    } else {
      startTimeFrom = now.add(2, "hour").second(0).millisecond(0).toISOString();
    }
    const params: Record<string, string> = {
      pickPointId: values.pickupPoint.value || initialValues.pickupPointId,
      dropPointId: values.dropPoint.value || initialValues.dropPointId,
    };
    if (startTimeFrom) params.startTimeFrom = startTimeFrom;
    if (startTimeTo) params.startTimeTo = startTimeTo;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    nav({
      pathname: "/bookings",
      search: `?${createSearchParams(params)}`,
    });
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        pickupPoint: initialValues.pickupPointId,
        dropPoint: initialValues.dropPointId,
        time: dayjs(initialValues.date),
      });
    }
  }, [form, initialValues]);
  return (
    <Form
      initialValues={{
        pickupPoint: initialValues.pickupPointId,
        dropPoint: initialValues.dropPointId,
        time: initialValues.dateTo ? dayjs(initialValues.date) : null,
      }}
      onFinish={handleSubmit}
      form={form}
      layout="vertical"
    >
      <div className="flex gap-6 items-end">
        <Form.Item
          label="Điểm xuất phát"
          name={"pickupPoint"}
          rules={[formRules.required("Điểm đi", true)]}
        >
          <Select
            style={{ height: 40, width: 150 }}
            labelInValue
            allowClear
            onChange={() => form.setFieldValue("dropPoint", null)}
            onClear={() => {
              form.setFieldValue("dropPoint", null);
            }}
            options={dataPick?.data?.map((item) => ({
              value: item._id,
              label: item.label,
            }))}
            optionFilterProp="label"
            placeholder="Chọn điểm đi"
          />
        </Form.Item>
        <Form.Item
          name={"dropPoint"}
          label="Điểm đến"
          rules={[formRules.required("Điểm đến", true)]}
        >
          <Select
            style={{ height: 40, width: 150 }}
            labelInValue
            options={dataDrop?.data?.map((item) => ({
              value: item._id,
              label: item.label,
            }))}
            optionFilterProp="label"
            placeholder="Chọn điểm đến"
            disabled={!pickupPoint}
          />
        </Form.Item>
        <Form.Item
          tooltip="Nếu không chọn ngày hệ thống sẽ tự lấy khoảng thời gian hiện tại trở đi"
          label="Ngày xuất phát"
          name={"time"}
        >
          <DatePicker
            style={{ height: 40, width: 150 }}
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
              height: 40,
              fontWeight: 700,
              width: 70,
              border: "none",
              outline: "none",
            }}
            className="hover:opacity-80!"
            icon={<SearchOutlined />}
          >
            Tìm
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FilterBooking;
