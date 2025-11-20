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
    queryFn: () => getPointRoute({ pickupPointId: pickupPoint.value }),
    enabled: !!pickupPoint,
  });
  const handleSubmit = (values: {
    pickupPoint: IPointSelect;
    dropPoint: IPointSelect;
    time: string;
  }) => {
    const selectedLocal = dayjs(values.time); // local time
    const todayLocal = dayjs(); // local

    const isToday = selectedLocal.isSame(todayLocal, "day");

    let startTimeFrom;
    let startTimeTo;

    if (isToday) {
      startTimeFrom = todayLocal
        .add(2, "hour")
        .second(0)
        .millisecond(0)
        .toISOString();
      startTimeTo = todayLocal.endOf("day").toISOString();
    } else {
      startTimeFrom = selectedLocal.startOf("day").toISOString();
      startTimeTo = selectedLocal.endOf("day").toISOString();
    }
    const params = {
      startTimeFrom,
      startTimeTo,
      pickPointId: values.pickupPoint.value || initialValues.pickupPointId,
      dropPointId: values.dropPoint.value || initialValues.dropPointId,
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
        time: dayjs(initialValues.date),
      }}
      onFinish={handleSubmit}
      form={form}
    >
      <div className="flex gap-6">
        <Form.Item
          noStyle
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
          noStyle
          name={"dropPoint"}
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
            placeholder="Chọn điểm đi"
            disabled={!pickupPoint}
          />
        </Form.Item>
        <Form.Item
          noStyle
          name={"time"}
          rules={[formRules.required("Ngày di chuyển", true)]}
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

        <Form.Item noStyle>
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
